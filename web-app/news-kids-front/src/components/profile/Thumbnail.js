import styled from "styled-components";

const Img = styled.img`
    width: ${(props) => props.lg ? "220px" : "120px"};
    height: ${(props) => props.lg ? "220px" : "120px"};
    margin: ${(props) => props.lg ? "0px" : "10px"};
    padding: 2px;
    object-fit: cover;
`;

function Thumbnail({ url = "", lg = false }) {
    return (
        <Img lg={lg} src={url} />
    )
}

export default Thumbnail;