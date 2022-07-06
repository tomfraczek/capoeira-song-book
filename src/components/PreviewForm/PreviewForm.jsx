import { Fragment } from 'react';

import CategoryBadge from '../CategoryBadge';

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
    console.log(watch('category'));
    return (
        <PreviewContainer>
            <Title>Preview</Title>
            <PreviewContent>
                {watch('category') && <CategoryBadge category={watch('category')} />}

                <PreviewParagraphContainer>
                    {/* <span>Title:</span> */}
                    <PreviewTitle>{watch('title')}</PreviewTitle>
                </PreviewParagraphContainer>

                {textInputs.map((input, i) => (
                    <Fragment key={i}>
                        <PreviewParagraphContainer>
                            {/* <span>{`Verse ${i + 1}:`}</span> */}
                            <PreviewParagraph>
                                <span>{watch(`${input}-a`) ? `${i + 1}. ` : null}</span>
                                <span>{watch(`${input}-a`)}</span>
                            </PreviewParagraph>

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
