import React, { useState, useEffect } from 'react';

import TransSubmit from "./TransSubmit";
import SameLevel from "./SameLevel";
import TranslationText from "./TranslationText";
import ExplainText1 from "./ExplainText1.js";
import HomeLogo from "../../common/homeLogo/HomeLogo.js"
import SiteLogo from "../../common/siteLogo/SiteLogo.js"

import { loadSentences, getRandomSentence, getUserLevel } from '../../common/levelTrans/levelTrans.mjs';

export default function Main(){
    const [currentSentence, setCurrentSentence] = useState("");
    const [userLevel] = useState(getUserLevel());
    const [translatedText, setTranslatedText] = useState("");

    useEffect(() => {
        const fetchSentences = async () => {
            const userLevel = getUserLevel();
            const sentences = await loadSentences();
            const initialSentence = getRandomSentence(userLevel, sentences);
            setCurrentSentence(initialSentence);
            localStorage.setItem('currentSentence', initialSentence);

            console.log("MainTrans currentSentence:", initialSentence);
        };
        fetchSentences();
    }, []);

    const handleTextChange = (text) => {
        setTranslatedText(text);
        localStorage.setItem('translatedText', text);
    };

    return (
        <div>
            <HomeLogo />
            <br />
            <SiteLogo />
            <ExplainText1 />
            <SameLevel currentSentence={currentSentence} />
            <TranslationText onTextChange={handleTextChange} />
            <TransSubmit translatedText={translatedText} />
        </div>
    );
}