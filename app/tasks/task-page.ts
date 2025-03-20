import { EventData, Page, Http, ObservableArray, ItemEventData } from "@nativescript/core";

interface Task {
    UN_Id: string;       // Add this line
    Work: string;
    Priority: string;
    TargetDate: string;
    Target_Date: string; // Since we’re also mapping this in the JSON
}

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const context = page.navigationContext;

    fetch(`https://icmjaipur.in/php/WrokTrack/2web_UsrTasks.php?status=open&assignTo=${context.userInput}&type=json`)
        .then(response => response.json())
        .then(data => {
            const taskList = data.map((task, index) => ({
                ...task,
                UN_Id: task["UN#\n(Auto)"], // Adding index starting from 1
                Target_Date: task["Target Date"]
                
            }));

            console.log("Fetched Tasks:", taskList);

            page.bindingContext = {
                userInput: context.userInput,
                taskList
            };
        })
        .catch(error => console.error("Error fetching tasks:", error));
}

export function onTaskTap(args: ItemEventData) {
    const view = args.view;
    const page = view.page; // Get the page from the view
    const userInput = page.bindingContext.userInput;

    const tappedTask = view.bindingContext as Task;
    const url = `https://icmjaipur.in/php/rr/2web_UsrTasks.php?assignTo=${userInput}&UN=${tappedTask.UN_Id}`;
    
    console.log("Generated URL:", url);
}