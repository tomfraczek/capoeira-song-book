import { Fragment } from 'react';
import {
    PreviewContainer,
    PreviewTitle,
    PreviewParagraph,
    PreviewParagraphContainer,
    PreviewParagraphBold,
    PreviewContent,
    Title,
} from './PreviewForm.styles';

const PreviewForm = ({ textInputs, watch, autoChorus }) => {
    console.log(watch('lyrics-b'));
    return (
        <PreviewContainer>
            <Title>Preview</Title>
            <PreviewContent>
                <PreviewParagraphContainer>
                    {/* <span>Title:</span> */}
                    <PreviewTitle>{watch('title')}</PreviewTitle>
                </PreviewParagraphContainer>

                {textInputs.map((input, i) => (
                    <Fragment key={i}>
                        <PreviewParagraphContainer>
                            {/* <span>{`Verse ${i + 1}:`}</span> */}
                            <PreviewParagraph>{watch(`${input}-a`)}</PreviewParagraph>

                            {/* <span>{`Chorus ${i + 1}:`}</span> */}
                            <PreviewParagraphBold>
                                {autoChorus ? watch('lyrics-b') : watch(`${input}-b`)}
                            </PreviewParagraphBold>
                        </PreviewParagraphContainer>
                    </Fragment>
                ))}
            </PreviewContent>
        </PreviewContainer>
    );
};

export default PreviewForm;
