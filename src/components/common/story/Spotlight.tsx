import StorySectionProps from '../../props/StorySectionProps'
import StorySection from './StorySection'

/**
 * Spotlight element from the Story Layout.
 * @param {StorySectionProps} props the component props.
 */
export default function Spotlight(props: StorySectionProps) {
    const {style, optionalModifiers, imageUrl, imageAlt} = props
    const modifiers = optionalModifiers !== undefined ? optionalModifiers.concat('spotlight') : []
    return <StorySection
        style={style}
        optionalModifiers={modifiers}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
    >
        {props.children}
    </StorySection>
}