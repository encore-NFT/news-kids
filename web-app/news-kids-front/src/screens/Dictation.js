import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import dictationData from "../static_data/dictationData";

function Dictation() {
    const questions = dictationData
    const restApiKey = '23f5f4a86af457b0872a2e55b52127f9'
    return (
        <ContainerLayout>
            <ContentLayout>
                받아쓰기 페이지
            </ContentLayout>
        </ContainerLayout>
    )
}

export default Dictation;