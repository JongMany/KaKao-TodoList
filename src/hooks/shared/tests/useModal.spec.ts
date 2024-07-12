import { describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useModal } from "../useModal";

describe("useModal", () => {
  it("should initialize with modal closed", () => {
    const { result } = renderHook(() => useModal({}));
    expect(result.current.isModalOpen).toBe(false);
  });

  it("should open the modal", () => {
    const { result } = renderHook(() => useModal({}));

    act(() => {
      result.current.showModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });
  it("should handle ok and close the modal if autoClose is true", () => {
    const mockHandler = vi.fn();
    const { result } = renderHook(() =>
      useModal({ modalHandler: mockHandler, autoClose: true })
    );

    act(() => {
      result.current.showModal();
    });

    act(() => {
      result.current.handleOk();
    });

    expect(mockHandler).toHaveBeenCalled();
    expect(result.current.isModalOpen).toBe(false);
  });

  it("should handle ok and keep the modal open if autoClose is false", () => {
    const mockHandler = vi.fn();
    const { result } = renderHook(() =>
      useModal({ modalHandler: mockHandler, autoClose: false })
    );

    act(() => {
      result.current.showModal();
    });

    act(() => {
      result.current.handleOk();
    });

    expect(mockHandler).toHaveBeenCalled();
    expect(result.current.isModalOpen).toBe(true);
  });

  it("should close the modal when handleCancel is called", () => {
    const { result } = renderHook(() => useModal({}));

    act(() => {
      result.current.showModal();
    });

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
