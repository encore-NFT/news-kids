import up_panda from '../../images/up_panda.svg';
import { useState } from "react";
import styled from "styled-components";

function TopButton() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        scrolled > 400 ? setVisible(true) : setVisible(false);
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button onClick={scrollToTop} style={{ display: visible ? 'inline-box' : 'none' }}>
            <img width="60px" height="100px" src={up_panda} alt="위로 올라가는 버튼" />
        </Button>
    )
}

export default TopButton;

const Button = styled.div`
    position: fixed; 
    width: 100%;
    left: 88%;
    bottom: 10px;
    height: 100px;
    cursor: pointer;
    z-index: 1;
`