import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import dictationData from "../static_data/dictationData";
import axios from 'axios';
import { Button } from "@material-ui/core";
import restApiKey from "../config";

function Dictation() {
    const questions = dictationData[0]

    const testVoice = async () => {
    const xmlData = '<speak>테스트해보기.</speak>';
    try {
        const { data } = await axios.post('https://kakaoi-newtone-openapi.kakao.com/v1/synthesize', xmlData, {
            headers: {
                'Content-Type': 'application/xml',
                'Authorization': `KakaoAK ${restApiKey}`,
                "Access-Control-Allow-Origin": "*",
            },
        });
        
        const context = new AudioContext();
        
        context.decodeAudioData(data, buffer => {
            const source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start(0);
        });
    } catch (e) {
        console.error(e.message);
    }
};

    return (
        <ContainerLayout>
            <ContentLayout>
                받아쓰기 페이지
                <Button onClick={testVoice}>
                    테스트
                </Button>
            </ContentLayout>
        </ContainerLayout>
    )
}

export default Dictation;