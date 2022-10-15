import styled, { keyframes } from "styled-components";

type LoadingSpinnerProps = {
    color?: string;
}

const LoadingSpinner = ({color}: LoadingSpinnerProps) =>{
    return(
        <LoadingSpinnerContainer>
            <Spinner color={color || "red"}>
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </Spinner>
        </LoadingSpinnerContainer>
    );
}

const LoadingSpinnerContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const skStretchdelay = keyframes`
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0)
`

const Spinner = styled.div<LoadingSpinnerProps>`
    margin: 100px auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;

    div {
        background-color: ${props => props.color};
        height: 100%;
        width: 6px;
        display: inline-block;
        
        -webkit-animation: ${skStretchdelay} 1.2s infinite ease-in-out;
        animation: ${skStretchdelay} 1.2s infinite ease-in-out;
    }

    .rect1{
        margin-right: 2px;
    }
    
    .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
        margin-right: 2px;
    }
      
    .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
        margin-right: 2px;
    }
      
    .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
        margin-right: 2px;
    }
      
    .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
`;



export default LoadingSpinner;