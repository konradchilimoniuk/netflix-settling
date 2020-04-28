import React, { createContext, useContext, useState } from 'react'
import { languages, translations } from './Translations'

// Testing how to use React Hooks here
// Changed to keep language object in Redux Store

export const TranslationContext = createContext({
    language: languages[0],
    translation: translations[languages[0].id]
})

export function TranslationProvider(props) {
  const translationContext = useContext(TranslationContext);
  const [language, setLanguage] = useState(translationContext.language);
  const [translation, setTranslation] = useState(translationContext.translation);

  const provider = {
    language,
    translation: translation,
    setLanguage: (selectedLanguage) => {
      setLanguage(selectedLanguage);
      setTranslation(translations[selectedLanguage.id]);
    }
  };

  return (
    <TranslationContext.Provider value={provider}>
      {props.children}
    </TranslationContext.Provider>
  );
};

export default function Translate(props) {
  return (
    <TranslationContext.Consumer>
      {context => context.translation[props.text]}
    </TranslationContext.Consumer>
  );
};