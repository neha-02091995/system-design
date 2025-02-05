import React from "react";
import styled from "styled-components";

// Define the types for the props
interface FillerProps {
    width: number;
}

interface ProgressBarProps{
    width: number
}

// Styled components with TypeScript
const Container = styled.div`
    width: 200px;
    height: 15px;
    border: 1px solid #ccc;
`;

const Filler = styled.div<FillerProps>`
    width: ${(props) => props.width}%;
    height:15px;
    background-color: red;
`;

// Define the component with TypeScript
const ProgressBar: React.FC<ProgressBarProps> = ({width}) => {
    return (
        <Container>
            <Filler width={width} />
        </Container>
    );
};

export default ProgressBar;
