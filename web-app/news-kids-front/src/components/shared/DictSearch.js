import styled from "styled-components";
import { Search } from "@material-ui/icons";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Card, CircularProgress, Container, InputBase, Typography, IconButton } from "@material-ui/core";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styledComponents from "styled-components";
import { theme } from "../../styles";
import DictApis from "../../api/DictApis";

function DictSearch() {
    const [inputWord, setInputWord] = useState("");
    const [searchData, setSearchData] = useState("");
    const [notData, setNotData] = useState("");
    const [loading, setLoading] = useState(false);

    const outSection = useRef();
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const { register, handleSubmit, reset } = useForm();

    const onSubmitValid = (data) => {
        getSearch(data);
        setInputWord(data);
        reset();
    };

    const getSearch = async (data) => {
        try {
            setLoading(true);
            const response = await DictApis.getWord(data);
            if (response) {
                setLoading(false);
                setNotData(response.data.channel);
            }
            const wordData = response.data.channel.item;
            if (Object.keys(wordData).length !== 0) {
                return setSearchData(wordData)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>
                <MenuBookIcon fontSize="large" style={openModal ? { color: '#333' } : { color: '#999' }} />
            </Button>
            {
                openModal === true
                    ? <UseModal ref={outSection} onClick={(e) => {
                        if (outSection.current === e.target) {
                            setOpenModal(false);
                            setSearchData("");
                            setInputWord("");
                        }
                    }}>
                        <DictCard>
                            <form onSubmit={handleSubmit(onSubmitValid)}>
                                <SearchGrid>
                                    <div>
                                        <Search />
                                    </div>
                                    <InputBase
                                        {...register('word')}
                                        name="word"
                                        vtype="text"
                                        fullWidth
                                        placeholder="단어 검색..."
                                    />
                                </SearchGrid>
                            </form>
                            {loading ?
                                <>
                                    <div style={{ margin: '0px 0px 15px 0px' }}>
                                        <CircularProgress fontSize="small" />
                                    </div>
                                </>
                                :
                                <>
                                    {notData.total !== "0" && Object.keys(searchData).length !== 0 && inputWord.word ?
                                        <Container>
                                            <WordResult variant="body2">{searchData[0]?.word}</WordResult>
                                            {searchData[0]?.sense?.map((sense, index) => (
                                                <WordContent key={index}>
                                                    {sense.definition}
                                                    <br />
                                                </WordContent>
                                            ))}
                                        </Container>
                                        :
                                        <Container>
                                            {
                                                inputWord.word ?
                                                    <ErrorTitle variant='body1'><span style={{ color: "#ff5f4e" }}>'{inputWord?.word}'</span>에 대한 검색결과가 없습니다.</ErrorTitle>
                                                    : <ErrorTitle variant='body1'>단어를 검색해주세요</ErrorTitle>
                                            }
                                        </Container>
                                    }
                                </>
                            }
                        </DictCard>
                    </UseModal>
                    : null
            }

        </>
    )
}

export default DictSearch;

const Button = styled.span`
    position: fixed; 
    top: 100px;
    right: 2%;
    cursor: pointer;
    z-index: 1;
`

const DictCard = styled(Card)({
    position: 'fixed',
    top: '100px',
    right: '5%',
    zIndex: '1',
    width: '300px',
    [theme.breakpoints.down("sm")]: {
        right: '8%',
    },
    [theme.breakpoints.down("xs")]: {
        right: '50px',
    },

});

const SearchGrid = styledComponents.div`
    display: flex;
    border-radius: 10px;
    border: 1px solid #dbdbdb;
    margin: 15px 10px 25px 10px;
    padding: 2px 10px;
    svg{
        height: 100%;
        margin-right: 5px;
        color: ${theme.palette.secondary.contrastText};
    }
`

const UseModal = styledComponents.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
`;

const ErrorTitle = styled(Typography)({
    textAlign: 'left',
    marginBottom: '30px',
})

const WordResult = styled(Typography)({
    marginBottom: '15px',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'underline',
    textUnderlinePosition: 'under'
})

const WordContent = styledComponents.li`
    font-size: 0.85rem;
    color: #666;
    margin: 15px 0px;
    word-break: keep-all;
`