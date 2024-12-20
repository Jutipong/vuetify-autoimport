const vBtn = {
    variant: 'flat',
    class: 'text-none font-500 pr-3 pl-3',
    rounded: 'lg',
}

const vSelect = {
    clearable: true,
    variant: 'outlined',
    density: 'compact',
    color: 'primary',
    hideDetails: 'auto',
    dirty: true,
    itemTitle: 'text',
    itemValue: 'id',
    rounded: 'lg',
}

const vNumber = {
    clearable: true,
    density: 'compact',
    color: 'primary',
    variant: 'outlined',
    dirty: true,
    rounded: 'lg',
}

const vDate = {
    clearable: true,
    density: 'compact',
    color: 'primary',
    dirty: true,
    variant: 'outlined',
    placeholder: '',
    prependIcon: '',
    appendInnerIcon: 'mdi-calendar',
    hideActions: 'true',
    rounded: 'lg',
}

const vChip = {
    label: true,
    density: 'compact',
    size: 'large',
    elevation: 0,
    rounded: 'lg',
    class: 'pl-4 pr-4',
}
export default {
    VContainer: {
        fluid: true,
    },
    VBtn: vBtn,
    VCard: {
        variant: 'flat',
        rounded: 'lg',
        class: 'mb-2 pa-1',
        VBtn: vBtn,
        VDateInput: vDate,
        VCardTitle: {
            class: 'mr-4 ml-4 mt-1 mb-1',
            VChip: vChip,
        },
        VCardText: {
            class: 'mr-4 ml-4',
            VSelect: vSelect,
            VNumberInput: vNumber,
            VFileInput: {
                clearable: true,
                hideDetails: 'auto',
                density: 'compact',
                color: 'primary',
                dirty: true,
                variant: 'outlined',
                rounded: 'lg',
            },
        },
        VCardActions: {
            class: 'mr-4 ml-4 mb-2',
            VBtn: vBtn,
        },
    },
    VTextField: {
        clearable: true,
        hideDetails: 'auto',
        density: 'compact',
        color: 'primary',
        dirty: true,
        variant: 'outlined',
        rounded: 'lg',
    },
    VAutocomplete: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
        dirty: true,
    },
    VCombobox: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VFileInput: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VTextarea: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
    },
    VSwitch: {
        color: 'primary',
        hideDetails: 'auto',
    },
    VDataTableServer: {
        color: 'primary',
        density: 'comfortable',
        hover: true,
        VSelect: {
            clearable: false,
            variant: 'underlined',
            density: 'compact',
            itemTitle: 'title',
            itemValue: 'value',
        },
    },
    VCheckbox: {
        color: 'primary',
        density: 'compact',
        hideDetails: 'auto',
    },
    VRadioGroup: {
        color: 'primary',
        density: 'compact',
        hideDetails: 'auto',
    },
    VRadio: {
        density: 'compact',
        hideDetails: 'auto',
    },
    VTabs: {
        color: 'primary',
    },
    VChip: vChip,
    VNumber: vNumber,
}
