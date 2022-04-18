import logo from '../../images/news-kids-logo.svg';
import { AppBar, Button, IconButton, InputBase, Menu, MenuItem, Toolbar } from "@material-ui/core";
import { AccountCircle, Search } from "@material-ui/icons";
import { styled } from "@material-ui/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";
import { theme } from "../../styles";
import isLoggedIn from '../../App';

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        handleClose();
        localStorage.removeItem("token");
        isLoggedIn(false);
        window.location.reload();
    }

    return (
        <MyAppBar position="fixed">
            <HeaderBar>
                <Toolbar>
                    <Link to={`/`}>
                        <img width="150px" height="26px" src={logo} alt="굿즈 로고" />
                    </Link>
                    <Link to={`/`}>
                        <MyButton>홈</MyButton>
                    </Link>
                    <Link to={`/trend`}>
                        <MyButton>트렌드</MyButton>
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
                            <MenuItem onClick={logout}>로그아웃</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </HeaderBar>
        </MyAppBar>
    );
}

export default Header;

const MyAppBar = styled(AppBar)({
    backgroundColor: '#ffffff'
});

const MyButton = styled(Button)({
    fontWeight: "bold",
    fontSize: '16px'
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
    border: 1px solid #dbdbdb;
    padding: 2px 10px;
    svg{
        height: 100%;
        margin-right: 5px;
        color: ${theme.palette.secondary.contrastText};
    }
`