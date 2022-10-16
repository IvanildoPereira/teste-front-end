import styled from "styled-components";
import { aspect } from "../../../types/AspectRatio";

type ResponsiveVideoIframeProps = {
    aspectRatio?: aspect;
    src?: string 
}

type IframeContainerProps = {
    aspectRatioSelected: aspect
}

const ResponsiveVideoIframe = (props: ResponsiveVideoIframeProps) =>{
    return (
       <IframeContainer aspectRatioSelected = {props.aspectRatio || aspect["16:9"]}>
         <iframe src={props.src} title="YouTube video player"/>
       </IframeContainer>
    )
}

export default ResponsiveVideoIframe;

const IframeContainer = styled.div<IframeContainerProps>`
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: ${props => props.aspectRatioSelected};
    margin-bottom: 15px;

    iframe{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }
`
