import { EventData, Page, Frame, TextField, NavigationEntry } from "@nativescript/core";
import { createViewModel, onSubmit } from "./main-view-model";

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const viewModel = createViewModel();
    page.bindingContext = viewModel;

    console.log(`🔵 Page Loaded - Initial userInput: "${viewModel.get("userInput")}"`);

    setTimeout(() => {
        const textField = page.getViewById<TextField>("userInputField");
        if (textField) {
            console.log("✅ TextField Found - Attaching textChange event");

            textField.on("textChange", (event) => {
                const tf = event.object as TextField;
                page.bindingContext.set("userInput", tf.text);

                console.log(`🟢 ViewModel Updated - userInput: "${page.bindingContext.get("userInput")}"`);
            });
        } else {
            console.error("❌ TextField not found! Ensure `id=userInputField` exists in XML.");
        }
    }, 100);
}

export function onSubmitTap(args: EventData) {
    const button = <any>args.object;
    const page = <Page>button.page;
    const textField = page.getViewById<TextField>("userInputField");

    // ✅ FINAL FIX: Fetch the latest text from `TextField` directly before navigating
    let userInput = textField?.text || "";
    page.bindingContext.set("userInput", userInput);

    console.log(`🚀 Final UserInput before navigation: "${userInput}"`);

    if (userInput.trim().length > 0) {
        onSubmit(userInput);

        const navigationEntry: NavigationEntry = {
            moduleName: "tasks/task-page",
            context: { userInput },
            animated: true
        };

        const frame = page.frame;
        if (frame) {
            frame.navigate(navigationEntry);
        } else {
            console.error("⚠️ Frame is undefined — navigation failed!");
        }
    } else {
        console.error("⚠️ Please enter a valid username or mobile number!");
    }
}
