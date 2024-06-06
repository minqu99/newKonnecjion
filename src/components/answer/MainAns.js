import React, { useState, useEffect } from 'react';

import BestAnswer from "./BestAnswer";
import Finish from "./Finish";
import UserTrans from "./UserTrans";
import ExplainText1 from "../pages/ExplainText1";
import HomeLogo from "../../common/homeLogo/HomeLogo.js"
import SiteLogo from "../../common/siteLogo/SiteLogo.js"

import { translateText } from '../result/deepltrans.js'; 

import { loadSentences,getRandomSentence, getUserLevel } from '../../common/levelTrans/levelTrans.mjs';

export default function MainAns(){

    const [userText, setUserText] = useState('');
    const [deeplTrans, setDeeplTrans] = useState('');

    const [currentSentence, setCurrentSentence] = useState("");
    const [userLevel] = useState(getUserLevel());

    const targetLang = 'KO';

    useEffect(() => {
        // 로컬 저장소에서 문장 및 사용자 텍스트 불러오기
        const storedSentence = localStorage.getItem('currentSentence');
        const storedUserText = localStorage.getItem('translatedText') || '';

        if (storedSentence) {
            setCurrentSentence(storedSentence);
            const fetchTranslation = async () => {
                try {
                    const result = await translateText(storedSentence, 'KO');
                    setDeeplTrans(result);
                } catch (err) {
                    console.error('Error translating sentence:', err);
                }
            };
            fetchTranslation();
        }

        setUserText(storedUserText);
    }, []);


    // 초기화 함수
    const handleReset = () => {
        localStorage.removeItem('translatedText'); 
    };

    const handleNextSentence = async () => {
        const sentences = await loadSentences();
        const newSentence = getRandomSentence(userLevel, sentences);
        if (newSentence) {
            setCurrentSentence(newSentence);
            try {
                const translatedSentence = await translateText(newSentence, 'KO');
                setDeeplTrans(translatedSentence);
                localStorage.setItem('translatedText', translatedSentence);
            } catch (err) {
                console.error('Error translating sentence:', err);
            }
        } else {
            // alert("모든 문장을 사용했습니다.");
        }
    };



    return (
        <div>
            <HomeLogo />
            <br />
            <SiteLogo />
            <ExplainText1 />
            <UserTrans translatedText={userText} />
            <BestAnswer deeplTrans={deeplTrans} />
            <Finish onNextSentence={handleNextSentence} onReset={handleReset} />
            {/* <Next></Next> */}
        </div>
    );
}