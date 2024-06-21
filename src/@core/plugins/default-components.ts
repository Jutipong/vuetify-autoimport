const vBtn = {
    variant: 'flat',
    class: 'text-none font-500 pr-3 pl-3',
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
}

const vNumber = {
    clearable: true,
    density: 'compact',
    color: 'primary',
    variant: 'outlined',
    dirty: true,

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
}

const vChip = {
    label: true,
    density: 'compact',
    size: 'large',
    elevation: 0,
}
export default {
    VContainer: {
        fluid: true,
    },
    VBtn: vBtn,
    VCard: {
        variant: 'flat',
        class: 'mb-3 pa-1',
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
    },
    VAutocomplete: {
        variant: 'outlined',
        density: 'compact',
        color: 'primary',
        hideDetails: 'auto',
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
