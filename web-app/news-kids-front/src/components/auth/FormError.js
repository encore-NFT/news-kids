import styled from "styled-components";

const SFormError = styled.span`
    color: #ff5f4e;
    font-weight: 600;
    font-size: 12px;
    margin: 6px 0px 10px 0px;
`;

function FormError({ message }) {
    return message === "" || !message ? null : <SFormError>{message}</SFormError>
}

export default FormError;