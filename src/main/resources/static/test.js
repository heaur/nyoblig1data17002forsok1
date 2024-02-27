let billetter = [];

function kjøpBilletter() {
    let ut = "<table>" +
        "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Email</th></tr>";

    const billett = {
        film: document.getElementById("filmer").value,
        antall: document.getElementById("antall").value,
        fornavn: document.getElementById("forNavn").value,
        etternavn: document.getElementById("etterNavn").value,
        telefonnummer: document.getElementById("tlfnr").value,
        email: document.getElementById("email").value,
    };

    // Sjekker om feltene er fylt ut
    if (!billett.antall || billett.antall === 0 || !billett.fornavn || !billett.etternavn || !billett.telefonnummer || !billett.email) {
        document.getElementById("antallError").innerHTML = "Feltet må fylles ut!";
        document.getElementById("fornavnError").innerHTML = "Feltet må fylles ut!";
        document.getElementById("etternavnError").innerHTML = "Feltet må fylles ut!";
        document.getElementById("tlfnrError").innerHTML = "Feltet må fylles ut!";
        document.getElementById("emailError").innerHTML = "Feltet må fylles ut!";
    } else {
        visBilletter();

        // sjekker om en film har blitt valgt
        if (!billett.film) {
            document.getElementById("filmError").innerHTML = "Du må velge en film!";
        } else {
            // Sjekker om navn og etternavn bruker gyldige tegn
            const navnRegex = /^[a-zA-Z\s]+$/;

            if (!navnRegex.test(billett.fornavn)) {
                document.getElementById("fornavnError").innerHTML = "Ugyldige tegn i fornavn!";
            } else {
                document.getElementById("fornavnError").innerHTML = "";
            }

            if (!navnRegex.test(billett.etternavn)) {
                document.getElementById("etternavnError").innerHTML = "Ugyldige tegn i etternavn!";
            } else {
                document.getElementById("etternavnError").innerHTML = "";
            }

            // Sjekker om e-post og telefonnummer er gyldig
            if (!gyldigEmail(billett.email)) {
                document.getElementById("emailError").innerHTML = "Ugyldig e-postadresse!";
            } else {
                document.getElementById("emailError").innerHTML = "";
            }

            if (!gyldigTelefonnummer(billett.telefonnummer)) {
                document.getElementById("tlfnrError").innerHTML = "Ugyldig telefonnummer!";
            } else {
                document.getElementById("tlfnrError").innerHTML = "";
            }

            // Legg til billetten hvis alt er i orden
            if (
                document.getElementById("fornavnError").innerHTML === "" &&
                document.getElementById("etternavnError").innerHTML === "" &&
                document.getElementById("emailError").innerHTML === "" &&
                document.getElementById("tlfnrError").innerHTML === ""
            ) {
                billetter.push(billett);
                visBilletter();
            }
        }
    }

    // Tøm feltene når billetter blir kjøpt
    document.getElementById("antall").value = "";
    document.getElementById("forNavn").value = "";
    document.getElementById("etterNavn").value = "";
    document.getElementById("tlfnr").value = "";
    document.getElementById("email").value = "";
}

function visBilletter() {
    const listeElement = document.getElementById("liste");
    listeElement.innerHTML = ""; // Tømmer listen først

    for (let billett of billetter) {
        const billettElement = document.createElement("li");
        billettElement.textContent = `${billett.fornavn} ${billett.etternavn} - ${billett.film} - Antall: ${billett.antall} - Telefon: ${billett.telefonnummer} - Email: ${billett.email}`;
        listeElement.appendChild(billettElement);
    }
}

function slettBilletter() {
    // Tøm arrayet og oppdater visningen
    billetter = [];
    visBilletter();
}

function gyldigEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function gyldigTelefonnummer(telefonnummer) {
    const telefonnummerRegex = /^\d{8,}$/;
    return telefonnummerRegex.test(telefonnummer);
}