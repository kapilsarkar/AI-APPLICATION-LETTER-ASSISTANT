import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplicationSchema } from "../validation/applicationSchema";
import {
  createApplication,
  generateDocument,
  updateApplication,
} from "../services/applicationService.js";
import { useAuth } from "./useAuth.js";
import {
  setLanguage,
  setTone,
  setSelectedCategory,
  setSelectedDocumentType,
  setFormData,
  resetToCategories,
  resetToDocumentTypes,
} from "../features/applicationSlice";

export const useApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState(null);
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [isSavingDocument, setIsSavingDocument] = useState(false); // <--- Added

  const { user } = useAuth();
  const dispatch = useDispatch();

  // Redux state
  const { language, tone, selectedCategory, selectedDocumentType, formData } =
    useSelector((state) => state.application);

  // Dynamic schema compilation
  const schema = useMemo(() => {
    return selectedDocumentType?.fields
      ? createApplicationSchema(selectedDocumentType.fields)
      : null;
  }, [selectedDocumentType]);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    values: formData,
  });

  // Reset inputs on document change
  useEffect(() => {
    if (selectedDocumentType) {
      reset({});
    }
  }, [selectedDocumentType, reset]);

  // Step navigation & Redux dispatchers
  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
    setCurrentStep(2);
  };

  const handleDocumentTypeSelect = (doc) => {
    dispatch(setSelectedDocumentType(doc));
    setCurrentStep(3);
  };

  const goToStep = (stepNumber) => {
    if (stepNumber === 1) {
      dispatch(resetToCategories());
      reset({});
      setCurrentStep(1);
    } else if (stepNumber === 2) {
      dispatch(resetToDocumentTypes());
      reset({});
      setCurrentStep(2);
    }
  };

  const updateLanguage = (val) => dispatch(setLanguage(val));
  const updateTone = (val) => dispatch(setTone(val));

  // Submit handler saving raw inputs to Supabase
  const onValidSubmit = async (data) => {
    if (!user) {
      setShowModal(false);
      return;
    }

    try {
      const savedApplication = await createApplication({
        userId: user.id,
        title: selectedDocumentType?.name || "Untitled Application",
        category: selectedCategory?.name || "",
        documentType: selectedDocumentType?.name || "",
        language,
        tone,
        formData: data,
      });

      dispatch(setFormData(data));

      setSubmittedPayload({
        ...savedApplication,
        fields: data,
      });

      setShowModal(true);
    } catch (error) {
      console.error("Error saving application:", error);
    }
  };

  // Trigger Gemini AI generation via Edge Function
  const handleGenerateDocument = async () => {
    if (!submittedPayload) return;

    try {
      setIsGenerating(true);
      setGenerationError("");

      const document = await generateDocument({
        category: submittedPayload.category,
        documentType: submittedPayload.document_type,
        language: submittedPayload.language,
        tone: submittedPayload.tone,
        formData: submittedPayload.fields,
      });

      setGeneratedDocument(document);

      // Persist the generated letter back to Supabase
      if (submittedPayload.id) {
        await updateApplication(submittedPayload.id, {
          generated_document: document,
        });
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error generating document:", error);
      setGenerationError(
        error.message || "Failed to generate document. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Persist manual inline edits to Supabase
  const saveEditedDocument = async (updatedText) => { // <--- Added
    if (!submittedPayload?.id) return;

    try {
      setIsSavingDocument(true);
      await updateApplication(submittedPayload.id, {
        generated_document: updatedText,
      });
      setGeneratedDocument(updatedText);
    } catch (error) {
      console.error("Failed to save edited document:", error);
    } finally {
      setIsSavingDocument(false);
    }
  };

  return {
    // State
    currentStep,
    showModal,
    setShowModal,
    submittedPayload,
    language,
    tone,
    selectedCategory,
    selectedDocumentType,
    errors,
    generatedDocument,
    setGeneratedDocument,
    isGenerating,
    generationError,
    isSavingDocument, // <--- Added

    // Actions & Handlers
    register,
    handleSubmit: handleSubmit(onValidSubmit),
    handleCategorySelect,
    handleDocumentTypeSelect,
    goToStep,
    updateLanguage,
    updateTone,
    handleGenerateDocument,
    saveEditedDocument, // <--- Added
  };
};