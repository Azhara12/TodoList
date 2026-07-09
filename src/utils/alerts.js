// src/utils/alerts.js
import Swal from "sweetalert2";

// Reusable configurations for professional feedback notifications
const baseAlertConfig = {
  timer: 2000,
  showConfirmButton: false,
  background: "#ffffff",
  customClass: {
    popup: "rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 dark:bg-[#1a1729]",
  },
};

export const alertUtils = {
  // Task Complete Notification
  success: (taskTitle) => {
    Swal.fire({
      ...baseAlertConfig,
      title: "🎉 Great Job!",
      text: `Your task "${taskTitle || "Task"}" has been completed.`,
      icon: "success",
      iconColor: "#10b981",
    });
  },

  // Task Pending / Reset Notification
  info: (taskTitle) => {
    Swal.fire({
      ...baseAlertConfig,
      title: "⏳ Update!",
      text: `Your task "${taskTitle || "Task"}" is now pending.`,
      icon: "info",
      iconColor: "#f59e0b",
    });
  },
};