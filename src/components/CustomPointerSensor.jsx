import { PointerSensor } from '@dnd-kit/core'

function isInteractiveElement(element) {
    const interactiveElements = [
        'button',
        'input',
        'textarea',
        'select',
        'option',
    ]

    if (interactiveElements.includes(element.tagName.toLowerCase())) {
        return true
    }

    return false
}

class CustomPointerSensor extends PointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown',
            handler: ({ nativeEvent: event }) => {
                if (
                    !event.isPrimary ||
                    event.button !== 0 ||
                    isInteractiveElement(event.target)
                ) {
                    return false
                }

                return true
            },
        },
    ]
}

export default CustomPointerSensor
