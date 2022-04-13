import { AppBar, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle, Search } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";
import { theme } from "../../styles";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <MyAppBar position="fixed">
            <HeaderBar>
                <Toolbar>
                    <Link to={`/`}>
                        <MyLogo variant="h6" noWrap>
                            News-Kids
                        </MyLogo>
                    </Link>
                    <Link to={`/`}>
                        <MyButton>홈</MyButton>
                    </Link>
                    <Link to={`/trend`}>
                        <MyButton>트랜드</MyButton>
                    </Link>
                    <Link to={`/quiz`}>
                        <MyButton>퀴즈</MyButton>
                    </Link>
                    <Grow />
                    <SearchGrid>
                        <div>
                            <Search />
                        </div>
                        <InputBase
                            placeholder="검색"
                        />
                    </SearchGrid>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <Link to={`/profile`}>
                                <MenuItem onClick={handleClose}>마이페이지</MenuItem>
                            </Link>
                            <MenuItem onClick={handleClose}>로그아웃</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </HeaderBar>
        </MyAppBar>
    );
}

export default Header;

const MyAppBar = styled(AppBar)({
    backgroundColor: theme.palette.primary.main,
});

const MyLogo = styled(Typography)({
    marginRight: "10px",
    color: theme.palette.primary.contrastText
});

const MyButton = styled(Button)({
    fontWeight: "bold",
});

const HeaderBar = styledComponents.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1048px;
`
const Grow = styledComponents.div`
    flex-grow: 1;
`

const SearchGrid = styledComponents.div`
    display: flex;
    border-radius: 10px;
    padding: 2px 10px;
    margin-right: 3px;
    background-color: ${theme.palette.primary.light};
    &:hover {
        background-color: ${theme.palette.secondary.light};
    }
    svg{
        height: 100%;
        margin-right: 5px;
        color: ${theme.palette.secondary.contrastText};
    }
`