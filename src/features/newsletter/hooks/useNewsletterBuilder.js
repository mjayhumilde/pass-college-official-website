import { useCallback, useEffect, useRef, useState } from "react";
import { createBlock } from "../constants/blockTypes";
import useNewsletterStore from "../store/useNewsletterStore";

const toNewsletterPayload = (blocks) =>
  blocks.map((block) => ({
    type: block.type,
    content: block.content,
    url: block.url,
    label: block.label,
    alt: block.alt,
  }));

export const useNewsletterBuilder = () => {
  const {
    subscribers,
    loadingSubscribers,
    subscriberError,
    sending,
    sendError,
    sendSuccess,
    fetchSubscribers,
    addSubscriber,
    deleteSubscriber,
    sendNewsletter,
    clearMessages,
  } = useNewsletterStore();

  const [blocks, setBlocks] = useState([]);
  const [subject, setSubject] = useState("");
  const [activeBlockId, setActiveBlockId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addName, setAddName] = useState("");
  const [addError, setAddError] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    fetchSubscribers();
    window.scrollTo(0, 0);
  }, [fetchSubscribers]);

  useEffect(() => {
    if (!sendSuccess && !sendError) return undefined;

    const timeoutId = setTimeout(() => clearMessages(), 5000);
    return () => clearTimeout(timeoutId);
  }, [clearMessages, sendError, sendSuccess]);

  const addBlock = useCallback((type) => {
    const block = createBlock(type);
    setBlocks((currentBlocks) => [...currentBlocks, block]);
    setActiveBlockId(block.id);
  }, []);

  const updateBlock = useCallback((updatedBlock) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block,
      ),
    );
  }, []);

  const deleteBlock = useCallback(
    (id) => {
      setBlocks((currentBlocks) =>
        currentBlocks.filter((block) => block.id !== id),
      );
      if (activeBlockId === id) setActiveBlockId(null);
    },
    [activeBlockId],
  );

  const moveBlock = useCallback((fromIndex, toIndex) => {
    setBlocks((currentBlocks) => {
      const updatedBlocks = [...currentBlocks];
      const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
      updatedBlocks.splice(toIndex, 0, movedBlock);
      return updatedBlocks;
    });
  }, []);

  const handleDragStart = useCallback((index) => {
    dragItem.current = index;
  }, []);

  const handleDragEnter = useCallback((index) => {
    dragOverItem.current = index;
  }, []);

  const handleDragEnd = useCallback(() => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      moveBlock(dragItem.current, dragOverItem.current);
    }

    dragItem.current = null;
    dragOverItem.current = null;
  }, [moveBlock]);

  const handleSend = useCallback(async () => {
    if (!subject.trim() || blocks.length === 0) return false;

    return sendNewsletter(subject, toNewsletterPayload(blocks));
  }, [blocks, sendNewsletter, subject]);

  const handleAddSubscriber = useCallback(async () => {
    setAddError("");

    if (!addEmail.trim()) {
      setAddError("Email is required");
      return false;
    }

    const added = await addSubscriber(
      addEmail.trim(),
      addName.trim() || "Subscriber",
    );

    if (added) {
      setAddEmail("");
      setAddName("");
    }

    return added;
  }, [addEmail, addName, addSubscriber]);

  return {
    activeBlockId,
    activeSubscriberCount: subscribers.filter((subscriber) => subscriber.active)
      .length,
    addBlock,
    addEmail,
    addError,
    addName,
    blocks,
    deleteBlock,
    deleteSubscriber,
    handleAddSubscriber,
    handleDragEnd,
    handleDragEnter,
    handleDragStart,
    handleSend,
    loadingSubscribers,
    sendError,
    sendSuccess,
    sending,
    setActiveBlockId,
    setAddEmail,
    setAddName,
    setShowPreview,
    setShowSubscribers,
    setSubject,
    showPreview,
    showSubscribers,
    subject,
    subscriberError,
    subscribers,
    updateBlock,
  };
};

export default useNewsletterBuilder;
