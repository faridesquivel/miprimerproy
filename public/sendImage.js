var ImageTransmitter = (function() {
    var btn;
    var fileinput;
    var transmit;
    var payload = "";
    var warningbox;
    console.log("Image JS iniciado");
    function onTransmitFinish() {
        console.log("La imagen ha sido transmitida...")
        btn.addEventListener('click', onClick, false);
        btn.disabled = false;
        var originalText = btn.innerText;
        btn.innerText = btn.getAttribute('data-quiet-sending-text');
        btn.setAttribute('data-quiet-sending-text', originalText);
    };

    function onClick(e) {
        console.log("TRANSMITIENDO");
        e.target.removeEventListener(e.type, arguments.callee);
        e.target.disabled = true;
        var originalText = e.target.innerText;
        e.target.innerText = e.target.getAttribute('data-quiet-sending-text');
        e.target.setAttribute('data-quiet-sending-text', originalText);
        if (payload === "") {
            onTransmitFinish();
            return;
        }
        transmit.transmit(payload);
    };

    function onFileRead(e) {
        payload = e.target.result;
    };

    function onFileSelect(e) {
        var reader = new FileReader()
        reader.onload = onFileRead;
        reader.readAsArrayBuffer(e.target.files[0]);
    };

    function onQuietReady() {
        console.log("Running quiet ready");
        var profilename = btn.getAttribute('data-quiet-profile-name');
        transmit = Quiet.transmitter({profile: profilename, onFinish: onTransmitFinish});
        btn.addEventListener('click', onClick, false);
        fileinput.addEventListener('change', onFileSelect, false);
        console.log("Quiet Ready to transmit");
    };

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
        warningbox.classList.remove("hidden");
        warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
    };

    function onDOMLoad() {
        btn = document.querySelector('[data-quiet-send-image-button]');
        fileinput = document.querySelector('[data-quiet-file-input]');
        warningbox = document.querySelector('[data-quiet-send-image-warning]');

        Quiet.addReadyCallback(onQuietReady, onQuietFail);
        console.log("Everything loaded...")
    };

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();