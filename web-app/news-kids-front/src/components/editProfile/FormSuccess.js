import styled from "styled-components";

const SFormSuccess = styled.span`
    color: #4d88d8;
    font-weight: 600;
    font-size: 12px;
    margin: 6px 0px 10px 0px;
`;

function FormSuccess({ message }) {
    return message === "" || !message ? null : <SFormSuccess>{message}</SFormSuccess>
}

export default FormSuccess;