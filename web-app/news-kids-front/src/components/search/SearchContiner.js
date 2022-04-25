import { Container, styled } from "@material-ui/core";

const SearchLayout = styled(Container)({
    border: '0.5px solid #eaeaea',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    padding: '1.5em 0em',
    boxShadow: '0px 0px 10px 1px #e2e2e2',
    textAlign: 'center',
    margin: '0 auto',
    marginBottom: '1rem'
});

function SearchContainer({ children }) {
    return (
        <SearchLayout>
            {children}
        </SearchLayout>
    )
}

export default SearchContainer;