import styled from "styled-components";

const Img = styled.img`
    width: ${(props) => props.lg ? "180px" : "100px"};
    height: ${(props) => props.lg ? "180px" : "100px"};
    margin: ${(props) => props.lg ? "2px" : "10px 0px 10px 10px"};
    padding: 2px;
    border-radius: 10px;
    object-fit: cover;
`;

function Thumbnail({ url = "", lg = false }) {
    return (
        <Img lg={lg} src={url} />
    )
}

export default Thumbnail;