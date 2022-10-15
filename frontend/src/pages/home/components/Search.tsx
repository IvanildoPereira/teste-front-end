import { Box, Button, FormHelperText, Input } from "@material-ui/core"
import {SearchRounded} from "@material-ui/icons"
import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { isFieldFilled } from "../../../utils/validate"

type searchProps = {
    defaultValue: string;
    placeholder: string,
    onSearch: (text: string) => void,
    isActiveAnimation: boolean
}

type animationProps = {
    isActive: boolean;
}

const Search = ({ defaultValue, placeholder, onSearch, isActiveAnimation }: searchProps) => {
    const [ searchText, setSearchText ] = useState<string>(defaultValue);
    const [ errorSearchText, setErrorSearchText ] = useState<string | null>(null);

    const handleSearch = () =>{
        setErrorSearchText(null)
        if(!isFieldFilled(searchText)){
            setErrorSearchText("Please Fill this field, to get a list of videos!");
            return;
        } 

        onSearch(searchText.trim());
    }

    return (
        <CardSearch isActive = {isActiveAnimation}>
            <Box style={{ display: 'flex', alignItems: 'center', width: "100%"}}>
                <Input
                    value={searchText}
                    error = {errorSearchText ? true : false}
                    placeholder={placeholder}
                    aria-label={"search"}
                    onChange={(e)=> setSearchText(e.target.value)}
                    style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.1rem', flex: 1}}
                    disableUnderline
                />
                <SearchButton color='primary' variant="contained" onClick={handleSearch} aria-label="Search Term" disableElevation>
                    <SearchRounded />
                </SearchButton>
            </Box>
            {errorSearchText && <FormHelperText id="component-error-text">{errorSearchText}</FormHelperText>}
        </CardSearch>
    )
}

const skateInTop = keyframes`
    0%{transform:translate(-50%,-50%)}
    100%{transform:translateX(-50%) translateY(calc(-50vh + 100px))}
`;

const CardSearch = styled.div<animationProps>`
    position: absolute;
    top: calc(50vh - 60px);
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    padding-left: 20px;
    height: 60px;
    background-color: #f5f5f5;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    animation: ${props => props.isActive ? "" : skateInTop} ${skateInTop} 0.7s ease-in-out;
    animation-fill-mode: forwards;

`

const SearchButton = styled(Button)`
    height: 60px;
`

export default Search