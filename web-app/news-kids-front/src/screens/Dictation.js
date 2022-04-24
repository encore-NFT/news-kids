import ContainerLayout from "../components/shared/ContainerLayout";
import ContentLayout from "../components/shared/ContentLayout";
import dictationData from "../static_data/dictationData";

function Dictation() {
    const questions = dictationData
    return (
        <ContainerLayout>
            <ContentLayout>
                받아쓰기 페이지
            </ContentLayout>
        </ContainerLayout>
    )
}

export default Dictation;