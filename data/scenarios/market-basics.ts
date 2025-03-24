import { Scenario  } from "../../types/scenarios"

export const marketBasicsScenario: Scenario = {
  id: "market-basics-001",
  title: "Market Greetings & Bargaining",
  description: "Learn how to greet vendors and negotiate prices at the market",
  imageUrl: "/images/scenarios/market-scene.jpg",
  languages: [
    {
      code: "sw",
      name: "Swahili",
      segments: [
        {
          id: "sw-1",
          character: {
            id: "vendor-1",
            name: "Mama Halima",
            avatarUrl: "/images/characters/mama-halima.jpg"
          },
          text: "Karibu! Ungependa kununua matunda?",
          translation: "Welcome! Would you like to buy some fruits?",
          audioUrl: "/audio/sw/market-1.mp3",
          options: [
            {
              id: "sw-1-a",
              text: "Ndiyo, naangalia machungwa",
              response: "Machungwa yangu ni matamu sana!",
              nextSegmentId: "sw-2",
              vocabularyWords: [
                { word: "machungwa", translation: "oranges" }
              ]
            }
          ]
        },
        {
          id: "sw-2",
          character: {
            id: "vendor-1",
            name: "Mama Halima",
            avatarUrl: "/images/characters/mama-halima.jpg"
          },
          text: "Bei ni shilingi mia mbili kwa moja.",
          translation: "The price is 200 shillings each.",
          options: [
            {
              id: "sw-2-a",
              text: "Ni ghali sana. Unaweza kupunguza bei?",
              response: "Sawa, shilingi mia moja hamsini.",
              nextSegmentId: "sw-3"
            }
          ]
        },
        {
            id: "sw-3",
            character: {
                id: "vendor-1",
                name: "Mama Halima",
                avatarUrl: "/images/characters/mama-halima.jpg"
            },
            text: "Umechukua mangapi?",
            translation: "How many will you take?",
            isEndpoint: true,
            options: []
        }
      ]
    },
    {
      code: "ki",
      name: "Kikuyu",
      segments: [
        {
          id: "ki-1",
          character: {
            id: "vendor-1",
            name: "Mama Halima",
            avatarUrl: "/images/characters/mama-halima.jpg"
          },
          text: "Ũrĩ mwega! Ũrenda kũgũra matunda?",
          translation: "Welcome! Would you like to buy some fruits?",
          audioUrl: "/audio/ki/market-1.mp3",
          options: [
            {
              id: "ki-1-a",
              text: "Ĩĩ, ndĩrarora macungwa",
              response: "Macungwa makwa nĩ meru mũno!",
              nextSegmentId: "ki-2"
            }
          ]
        }
        // ... additional Kikuyu segments
      ]
    }
  ]
}
