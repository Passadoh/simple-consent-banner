export default {
  content: {
    "nl-nl": {
      main: {
        contentParagraph: [
          "We maken gebruik van cookies en vergelijkbare technieken om onze diensten en advertenties te leveren, te onderhouden en te verbeteren. We verzamelen hiervoor ",
          {
            type: 'personal-data-popover',
            text: 'informatie',
            title: 'Welke informatie verzamelen we over je surfgedrag?',
            list: [
              {
                name: 'Identifiers betreffende je apparaat',
                contentParagraphs: [
                  'Dit zijn identifiers welke worden opgeslagen in een cookie.',
                ]
              },
              {
                name: 'Gebruiksinteracties',
                contentParagraphs: [
                  'Met informatie over interacties wordt bedoeld:',
                  {
                    type: 'list',
                    list: [
                      'de weergave van specifieke pagina’s;',
                      'alle scroll-, touch-, klikacties;',
                      'specifieke gebeurtenissen, zoals het delen of lezen van een artikel; of',
                      'de doorgebrachte tijd op een pagina of de website als geheel.'
                    ]
                  },
                  'Alle interacties worden gekoppeld aan een tijdstip en datum.'
                ]
              },
              {
                name: 'Browser- en Apparaatgegevens',
                contentParagraphs: [
                  'Bij een bezoek aan de website wordt er informatie over je browser en apparaat verzameld. Het gaat dan in ieder geval om:',
                  {
                    type: 'list',
                    list: [
                      'het type-/versie browser, apparaat of bestuurssysteem (user-agent);',
                      'de gebruikte link om op deze website te komen (referrer);',
                      'de taalinstelling van de browser (accept-language);',
                      'de scherm- en venstergrootte;',
                      'de laadtijd van een pagina; en',
                      'je onnauwkeurige locatiegegevens op het niveau van land, regio en/of woonplaats.'
                    ]
                  },
                ]
              }
            ]
          },
          " over je surfgedrag. Klik op ",
          {
            type: 'consent-popover',
            text: "akkoord ",
            title: 'Waarvoor geef je akkoord?',
            purposeLists: [
              {
                type: 'first-party',
                purpose: 'Het tonen van gepersonaliseerde content en advertenties op onze website. Bijvoorbeeld:',
                list: [
                  'een banner op de homepage welke aansluit op je eerdere surfgedrag',
                  '...'
                ]
              },
              {
                type: 'third-party',
                purpose: 'Voor het tonen van gepersonaliseerde advertenties delen we gegevens met:',
                list: [
                  {
                    name: 'Facebook',
                    privacyNotice: 'https://www.facebook.com/about/privacy'
                  },
                  {
                    name: 'Google Ads',
                    privacyNotice: 'https://policies.google.com/technologies/ads?hl=nl'
                  },
                  {
                    name: 'Twitter',
                    privacyNotice: 'https://twitter.com/en/privacy'
                  }
                ]
              }
            ]
          },
          " als je wilt dat we de content en advertenties die je ziet aan de hand van je surfgedrag personaliseren. Meer informatie in het ",
          {
            type: 'inline-url',
            text: 'privacy beleid',
            url: "/privacy"
          },
          "."
        ],
        btnOoptions: "Weigeren",
        btnAgree: "Akkoord"
      }
    }
  },
  settings: {
    domain: 'localhost',
    path: '/',
    secure: true,
    httpOnly: false,
    maxAge: 15552000,
    sameSite: 'none'
  }
};