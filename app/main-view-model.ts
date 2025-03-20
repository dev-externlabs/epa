import { Observable } from "@nativescript/core";

export function createViewModel() {
    const viewModel = new Observable();
    viewModel.set("userInput", ""); // Ensures `userInput` starts as an empty string
    console.log("✅ ViewModel Initialized - userInput set to empty string");
    return viewModel;
}

// ✅ Fix: Add the missing `onSubmit` function
export function onSubmit(userInput: string) {
    console.log(`🟢 Submitted userInput: "${userInput}"`);
}
