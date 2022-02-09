/**
 * - We will be using an immediately invoked function expression for this project
 * - All the code for this project will be wrapped inside the IIFE.
 * - An Immediately Invoked Function Expression (IIFE) runs immediately it is defined
 * 
 * - Assignments:
 *  1. Outline the benefits of using an IIFE in your projects
 *  2. What is the method of defining an IIFE?
 */

(function(){

    /**
     * SECTION 1.
     * 
     * Register all the ids, classes and elements here
     * This section registers all the Elements, Ids and Classes
     * 
    */
    const createNoteBtn = document.querySelector("#create-note-btn");
    const createNoteLink = document.querySelector("#create-note-link");
    const notesElement = document.querySelector(".notes-body");
    const notesInfo = document.querySelector(".notes-info");


    //Persistent mode
    //persisent_mode of true will save data to localStorage
    const persistent_mode = false;


    //Set the default ul Element
    ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");
    ulElement.classList.add("list-group-flush");
    notesElement.appendChild(ulElement);
        
    /**
     * SECTION 2. : Functions Definitions
     * 
     * 
     * 
     *  Initialize the application by creating all the necessary elements
     * - The following elements will be created each time this function is called..
     * - 1. The Input Field for adding item to the menu..
     * - 2. 
     */
    function initializeApp(){

        //check if the area for adding notes is available
        if(notesElement.querySelector("ul").children.length == 0){
            //there are no notes at the moment
            notesInfo.innerHTML = `<div class="alert alert-info">
                                                You have not created any note
                                        </div>`;
        }


    }

    

    /**
     * Creates a new note
     * @param {string} note_title: the title of the note
     * @param {string} note_content: the content of the note
     */
    function createNote(note_title, note_content){
        // - this function will create a new note...
        // - every new note must have a time that it was created..
        // - to add the time, we will use the Date object...

        // Create the new date instance
        const date = new Date();

        //Now that we have the date instance, we will get the timestamp from this instance
        time_created = date.getTime();

        //Read more about Date object here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        //Read a more simplified version here: https://www.w3schools.com/js/js_date_methods.asp

        //Now that we have the time created data..
        // ... we will add it to the data we will be adding to the DOM..

        let note_object = {
            note_title: note_title,
            note_content: note_content,
            time_created: time_created
        }


        //check the settings for how this note should be rendered..
        //This application comes with persistent_mode: which determines how the data should be saved

        if(persistent_mode == true){
            //save to localStorage
        }else{
            //render to the DOM normally
            listElement = document.createElement("li");
            listElement.classList.add("list-group-item");

            listElement.id = `note_item_${note_object.time_created}`; //give this list item a unique id using the time_created..
            //...this will come handy later when updating this list item

            headerNote = document.createElement("h4");

            //so we do just that belong
            //we will be using the stringified format in editing very soon ...
            // ... this format is also useful when we are trying to do some other works..
            // ... the important thing to note here is that that, to comfortably pass objects to functions as arguments, you need to stringify them.
            // .. you can use typecasting by using the String() method, but a more reliable way is to use JSON.stringify();
            let note_object_string = JSON.stringify(note_object);
           
            anchorWithin = document.createElement("a");
            //anchorWithin.href = "";
            anchorWithin.innerText = note_object.note_title;

            //give the anchorWithin an id
            anchorWithin.id = `anchor_${note_object.time_created}`;

            headerNote.appendChild(anchorWithin);

            noteBody = document.createElement("div");
            noteBody.innerHTML = `<p class='p-3 bg-light'>${note_object.note_content}</p>`;

            //give the noteBody an id
            noteBody.id = `body_${note_object.time_created}`;
            noteBody.style.display = "none";

            //attach a div tag to this h4 element
            divElement = document.createElement("div");
            divElement.classList.add("col-md-6");
            divElement.classList.add("bg-dark");
            divElement.classList.add("text-light");
            divElement.classList.add("p-1");


            //add the small tag within the divElement
            smallElement = document.createElement("small");

            //create the anchor tag within the small tag
            editAnchor = document.createElement("a");
            //editAnchor.href="#";
            editAnchor.innerText = "Edit Note";
            editAnchor.classList.add("edit-anchor");

            //to add the edit functionality, we need a way to show the contents of the note so that we can edit it

            //add the id for the editing
            //since this id must be unique, we will use the time_created property of the note_object object to create it ...
            // ... instead of "edit-anchor-id", we will use edit_anchor_${note_object.time_created}
            editAnchor.id = `edit_anchor_${note_object.time_created}`;


            //create the delete anchor
            deleteAnchor = document.createElement("a");
            deleteAnchor.href = "#";
            deleteAnchor.innerText = "Delete Note";
            deleteAnchor.classList.add("delete-anchor");

            //add the id for the deletion
            //since this id must be unique, we will use the time_created property of the note_object object to create it ...
            // ... instead of "delete-anchor-id", we will use delete_anchor_${note_object.time_created}
            deleteAnchor.id = `delete_anchor_${note_object.time_created}`;

            //append the smallELement to the divELement
            divElement.appendChild(smallElement);

            //append the editAnchor and deleteAnchor to the smallElement
            smallElement.appendChild(editAnchor);
            smallElement.appendChild(deleteAnchor);


            //append the headerNote and divElement...
            listElement.append(headerNote, noteBody, divElement); //Note the use of append() here... this will place headerNote and divElement side by side.




            //clear whatever error is inside the noteElement
            if(!notesElement.querySelector("ul")){
                notesElement.appendChild(ulElement);
    
                //add the note
                ulElement.appendChild(listElement);
            }else{
                ulElement.appendChild(listElement);
            }

            notesInfo.innerHTML = `<div class="alert alert-success">
                                                New note added
                                        </div>`;


        

         //Listen for when the Note title is clicked to read the note body...
         document.querySelector(`#anchor_${note_object.time_created}`).onclick = function(){

                if(document.querySelector(`#body_${note_object.time_created}`).style.display == "none"){
                    document.querySelector(`#body_${note_object.time_created}`).style.display = "";
                }else{
                    document.querySelector(`#body_${note_object.time_created}`).style.display = "none";
                }

        }


        //Listen for when the Delete Note link is clicked..
        document.querySelector(`#delete_anchor_${note_object.time_created}`).onclick = function(event){

            //confirm before deleting..
            //we are using the confirm() in-built JavaScript function.
            //You may use a Bootstrap Alert or Modals for this same purpose..
            //Read about Alerts here: https://getbootstrap.com/docs/4.6/components/alerts/

            check_confirmation = confirm("Do you really want to delete this note? ");

            if(check_confirmation == true){
                //delete this note..
                // event.target.parentNode.parentNode.r
                // event.target.previousSibling.remove();
                // event.target.previousSibling.previousSibling.remove();

                //console.log(event.target.parentNode);
                //console.log(event.target.parentNode.parentNode);//the div that holds the Edit and Delete anchor
                //console.log(event.target.parentNode.parentNode.parentNode); //the list item..

                event.target.parentNode.parentNode.parentNode.remove();

                //update the info..
                notesInfo.innerHTML = `<div class="alert alert-danger">
                                            Note deleted
                                        </div>`;
            
                //check the number of notes left..
                if(ulElement.children.length == 0){
                    notesInfo.innerHTML += `<div class="alert alert-info">
                                                You have not created any note
                                        </div>`;
                }


            }



        }


        //Listen for when the Edit Note Link is clicked
        document.querySelector(`#edit_anchor_${note_object.time_created}`).onclick = function(event){

            //console.log("OLD NOTE: ", note_object);

            note_object_string = JSON.stringify(note_object);

            //popup a simple modal for editing the note..

            //As you can see, we have set the second parameter to be a callback function ...
            //... this callback function, once its done, will return the new_note_object_string ...
            //... this can then be parsed with JSON.parse() so thaty it replaces the old note_object

            //Read more about Callback functions here: https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
            openEditNoteModal(note_object_string, function(new_note_object_string){

                note_object = JSON.parse(new_note_object_string);

            }); //now we are making use of the note_object_string that we created above..

            


        }


        
            

        }


    }


    /**
     * This function is called when the Edit Note is clicked
     * @param {string} note_object_string 
     * @param {function} callbackFunction 
     */
    function openEditNoteModal(note_object_string, callbackFunction){

        //You have seen how to use Bootstrap Modals to create popups...
        //for this functionality, we will create our own popup instead of using that of Bootstrap

        //to use our own, we will create a very simple div that holds the note title and content...

        //the note_object_string parameter is a stringified data format...
        //... to convert to the way it was which is the object, we will use JSON.parse()
        let note_object = JSON.parse(note_object_string);

        //since note_object is an object, we have access to the note_title, note_content and time_created properties...

        //to get started, check if an overallEditContentDiv with the specific unique id exists, it it does, remove it first..
        if(document.querySelector(`#overall_edit_content_div_${note_object.time_created}`)){
            //if this exists remove it...
            document.querySelector(`#overall_edit_content_div_${note_object.time_created}`).remove();
        }

        let overallEditContentDiv = document.createElement("div");
        overallEditContentDiv.classList.add("col-md-6"); //so that is occupies half of the parent
        overallEditContentDiv.classList.add("form"); //so that it behaves like bootstrap form class...
        overallEditContentDiv.classList.add("p-4");
        overallEditContentDiv.classList.add("mt-2");
        overallEditContentDiv.classList.add("bg-danger");
        overallEditContentDiv.classList.add("text-light");
        overallEditContentDiv.id = `overall_edit_content_div_${note_object.time_created}`;//give this a unique id

        //add positioning to this ...
        overallEditContentDiv.style.position = "relative";

        //create the close button
        let closeBtn = document.createElement("btn");
        closeBtn.classList.add("btn");
        closeBtn.classList.add("btn-sm");
        closeBtn.innerText = "Close";

        closeBtn.style.position = "absolute";
        closeBtn.style.right = "10px";
        closeBtn.style.top = "10px";

        closeBtn.id = `close_edit_${note_object.time_created}`;

        //Read about Bootstrap 4 classes here: https://www.w3schools.com/bootstrap4/bootstrap_ref_all_classes.asp


        //this overallEditContent will contain the note title and note content

        //the editable title
        let editTitleContent = document.createElement("textarea");
        //put the current value inside the title 
        editTitleContent.value = note_object.note_title;
        editTitleContent.id = `edit_note_title_${note_object.time_created}`; //we are using time_created to create a unique id
        editTitleContent.classList.add("form-control"); //add Bootstrap's form-control class

        //the editTitle needs to be placed in a wrapper div
        let editTitleWrapperDiv = document.createElement("div");

        //this wrapperDiv should have a bootstrap class of form-group
        editTitleWrapperDiv.classList.add("form-group");

        //add a label
        let editTitleLabel = document.createElement("label");
        editTitleLabel.innerText = 'Edit Note Title';


        //lets append the editTitleContent to the editTitleWrapperDiv
        editTitleWrapperDiv.append(editTitleLabel, editTitleContent); //note the use of append() and not appendChild() ... this is ready to be appended..


        //the editable content
        let editContentContent = document.createElement("textarea");
        editContentContent.value = note_object.note_content;
        editContentContent.id = `edit_note_content_${note_object.time_created}`; //again, we are using time_created to create a unique id
        editContentContent.classList.add("form-control"); //add Bootstrap's form-control class

        //the editContent needs to be placed in a wrapper div
        let editContentWrapperDiv = document.createElement("div");
        editContentWrapperDiv.classList.add("form-group");

        //create the label
        editContentLabel = document.createElement("label");
        editContentLabel.innerText = "Edit Note Content";

        editContentWrapperDiv.append(editContentLabel, editContentContent); //note the use of append() and not appendChild()..this is ready to be appended to a parent node




        //we need a save button..
        let saveEditButton = document.createElement("button");
        
        //Button types are 'submit' by default, so we need to change this to the 'button' type
        saveEditButton.type = 'button';

        //we need to give this button a unique id 
        saveEditButton.id = `edit_note_save_btn_${note_object.time_created}`; //again, we are using the time_created property to create a unique id

        saveEditButton.innerText = "Save Update";

        saveEditButton.classList.add("btn");
        saveEditButton.classList.add("btn-sm");
        saveEditButton.classList.add("btn-warning");

        //put the save button inside a div
        let saveButtonWrapperDiv = document.createElement("div");
        saveButtonWrapperDiv.classList.add("form-group");

        saveButtonWrapperDiv.appendChild(saveEditButton);


        //put everything inside overallEditContentDiv
        overallEditContentDiv.append(closeBtn, editTitleWrapperDiv, editContentWrapperDiv, saveButtonWrapperDiv); //again note the use of append() and not appendChild()
        

        //add overallEditContentDiv to the DOM
        //document.body.appendChild(overallEditContentDiv);

        document.querySelector(`#note_item_${note_object.time_created}`).appendChild(overallEditContentDiv);






        //Listen for When the Close Btn for Edit Note is clicked
        document.querySelector(`#close_edit_${note_object.time_created}`).onclick = function(event){
            
            //remove the edit form
            event.target.parentNode.remove();

        }


        //Listen for When the saveEditButton is clicked
        document.querySelector(`#edit_note_save_btn_${note_object.time_created}`).onclick = function(){

            //get the updates
            let newNoteTitle = document.querySelector(`#edit_note_title_${note_object.time_created}`)
            let newNoteContent = document.querySelector(`#edit_note_content_${note_object.time_created}`)

            if(newNoteTitle.value.trim().length != 0 && newNoteContent.value.trim().length != 0){

                document.querySelector(`#anchor_${note_object.time_created}`).innerText = newNoteTitle.value.trim();
                document.querySelector(`#body_${note_object.time_created}`).innerText = newNoteContent.value.trim();

                
                note_object.note_title = newNoteTitle.value.trim();
                note_object.note_content = newNoteContent.value.trim();

                note_object_restringified = JSON.stringify(note_object);



                //Once we are done, we need a way to send the new updated note_object back to the global scope,...
                // ...we will use callback functions for this...
                //remember this function requires a callback function as its second argument..
                callbackFunction(note_object_restringified);

            }

        }
        

    }

  
    /**
     * Shows the Modal for creating a new note
     */
    function showCreateNoteModal(){

        //This modal code comes from Bootstrap...
        //read more about Modals here: https://getbootstrap.com/docs/4.6/components/modal/

        //Note that we have given this modal code an id: create-note-modal

        const modalCode = `<div class="modal" tabindex="-1" id='create-note-modal'>
                            <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                <h5 class="modal-title">Create Note</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                </div>
                                <div class="modal-body">
                                <div>
                                    <form action='#' class='form'>
                                        <div class='form-group'>
                                            <label>Note Title</label>
                                            <textarea class="form-control" id="note-title"></textarea>
                                        </div>

                                    <div class='form-group'>
                                        <label>Note Content</label>
                                        <textarea class="form-control" id="note-content"></textarea>
                                    </div>
                                
                                    
                                    </form>
                                </div>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-primary" id="save-new-note-btn">Save changes</button>
                                </div>
                            </div>
                            </div>
                        </div>`;

    //once we have the modal code inform of string, we need to add it to the DOM..

    //We will first create the place we want to put it in the DOM
    const placement = document.createElement("div");

    //then we give this newly created element an id..
    placement.id = "modal-loader";

    // We then add this to the body of the document
    document.body.appendChild(placement);

    // Once we add this to the document body, we need to show it

    
    placement.innerHTML = modalCode; //add the modalCode to the placement...

    //since Bootstrap uses jQuery, we will use it to load and trigger the modal
    //Please read more about Modals and Modals Events here: 
    // Modals - https://getbootstrap.com/docs/4.6/components/modal/
    // Modals Events - https://getbootstrap.com/docs/4.6/components/modal/#events

    // Read about how to trigger a Modal here: 
    // Trigger a Modal: https://getbootstrap.com/docs/4.6/components/modal/#methods

    $("#create-note-modal").modal("show"); //this code will trigger show the modal with the id of create-note-modal





    //IMPORTANT NOTE
    //Since we created the modal inside this function, the form inside the modal SHOULD be processed inside this function, 
    //if we attempt to process this form outside this function, code will not work

    //Process the Form
    const saveNewNoteBtn = document.querySelector("#save-new-note-btn");
    
    //once the button is clicked...
    saveNewNoteBtn.onclick = function(){
        //ensure that other fields are filled..
     
        let note_title = document.querySelector("#note-title").value.trim();
        let note_content = document.querySelector("#note-content").value.trim();

        if(note_title.length != 0 && note_content.length != 0){

            //call the createNote() function;
            createNote(note_title, note_content);

        }else{
            //show an error..
            //the two fields must be filled

            //We will be using Bootstrap Toasts to show this error notifications
            //Read more about Bootstrap Toasts here: https://getbootstrap.com/docs/4.6/components/toasts/

            //Note that we have given the toast an id of error-toast.

            const errorToastCode = `<div role="alert" aria-live="assertive" aria-atomic="true" data-delay="1500" class="toast bg-danger" id='error-toast'>
                        <div class="toast-header">
                        <strong class="mr-auto">Error</strong>
                        </div>
                        <div class="toast-body text-light">
                        Note Title and Content MUST be entered.
                        </div>
                    </div>`;

            
            //We need a place to place this errorCode

            //lets create the place in the DOM to place the errorCode which contains the Toast
            const toastPlacement = document.createElement("div");

            toastPlacement.id = "toast-loader"; //we give it an id of 'toast-loader'

            document.body.appendChild(toastPlacement); // we append it to the document body

            //put the errorCode which bears the toast code inside the toastPlacement
            toastPlacement.innerHTML = errorToastCode;

            //Then we need to trigger the Toast

            //Read more about Triggering Toasts here: https://getbootstrap.com/docs/4.6/components/toasts/#methods

            //Close all modals before showing the Toast
            //$(".modal").modal("hide");


            $("#error-toast").toast("show"); //this will show the Toast.


        }



    }


    }


   





    /**
     *  SECTION 3.
     *  Handles Events
     *  - This section of IIFE handles the creating listening to events
     *  - The following are the events being listened for:
     *  - 1. When the #create-note-btn is clicked
     * 
     * 
     */



    //When the #create-note-btn button is clicked
    createNoteBtn.onclick = function(){
        //when the #create-note-btn is clicked
        // a modal should popup for the user to create a new note
        // to make the modal pop up, we will put the modal inside a function call showCreateNoteModal() ...
        // then we will call that showCreateNoteModal() here within this function

        //call the showCreateNoteModal() function
        showCreateNoteModal();



    }

    createNoteLink.onclick = function(){
         //when the #create-note-btn is clicked
        // a modal should popup for the user to create a new note
        // to make the modal pop up, we will put the modal inside a function call showCreateNoteModal() ...
        // then we will call that showCreateNoteModal() here within this function

        //call the showCreateNoteModal() function
        showCreateNoteModal();
    }










    //start the app
    initializeApp();


}())