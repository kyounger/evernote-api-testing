// Create a file called `.env`
// Add the following lines to that file:
EN_CONSUMER_KEY=xxxxxx
EN_CONSUMER_SECRET=xxxxxx
SANDBOX=true
AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

var express = require('express');
var Evernote = require('evernote').Evernote;
var app = express();
//var restler = require('restler');
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());


app.get('/sync', function(request, response) {

    var authToken = process.env.AUTH_TOKEN;
    var client = new Evernote.Client({token: authToken, sandbox: true});
    var noteStore = client.getNoteStore();

    var mynotebook;
    var notebooks = noteStore.listNotebooks(function (err, notebooks) {
        if(err) {
            console.log(err);
        }
        else {

            console.log("Found " + notebooks.length + " notebooks:");
            for (var i in notebooks) {
                console.log("  * " + notebooks[i].name);
                console.log("  * " + notebooks[i].guid);
            }
        }

    });


    var filter = new Evernote.NoteFilter();
    var resultSpec = new Evernote.NotesMetadataResultSpec();

    // this determines which info you'll get for each note
    resultSpec.includeTitle  = true;
    resultSpec.includeContentLength = true;
    resultSpec.includeCreated = true;
    resultSpec.includeUpdated = true;
    resultSpec.includeDeleted = true;
    resultSpec.includeUpdateSequenceNum = true;
    resultSpec.includeNotebookGuid = true;
    resultSpec.includeTagGuids = true;
    resultSpec.includeAttributes = true;
    resultSpec.includeLargestResourceMime = true;
    resultSpec.includeLargestResourceSize = true;
    filter.notebookGuid = "66aa33f0-51e1-4c24-b5d5-e151abe2d2ef";


    var test = noteStore.findNotesMetadata(authToken, filter, 0, 10, resultSpec, function(err, notesList) {
        //for (var i in notesList.notes) {
        //    console.log(notesList.notes[i]);
        //}
        return "test string"; //notesList.notes;
    });
    console.log(test);

    response.send("<html><body>" + "test" + "</body></html>");

});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
