export const mq_sm = 640;
export const mq_md = 768;
export const mq_lg = 1024;
export const mq_xl = 1280;

//

export function updateMediaQueries() {
    isBreakpointUpSM.value = window.matchMedia(`(min-width: ${mq_sm}px)`).matches;
    isBreakpointUpMD.value = window.matchMedia(`(min-width: ${mq_md}px)`).matches;
    isBreakpointUpLG.value = window.matchMedia(`(min-width: ${mq_lg}px)`).matches;
    isBreakpointUpXL.value = window.matchMedia(`(min-width: ${mq_xl}px)`).matches;

    isBreakpointDownSM.value = window.matchMedia(`(max-width: ${mq_sm - 0.02}px)`).matches;
    isBreakpointDownMD.value = window.matchMedia(`(max-width: ${mq_md - 0.02}px)`).matches;
    isBreakpointDownLG.value = window.matchMedia(`(max-width: ${mq_lg - 0.02}px)`).matches;
    isBreakpointDownXL.value = window.matchMedia(`(max-width: ${mq_xl - 0.02}px)`).matches;

    isBreakpointOnlySM.value = window.matchMedia(`(min-width: ${mq_sm}px) and (max-width: ${mq_sm - 0.02})`).matches;
    isBreakpointOnlyMD.value = window.matchMedia(`(min-width: ${mq_md}px) and (max-width: ${mq_md - 0.02})`).matches;
    isBreakpointOnlyLG.value = window.matchMedia(`(min-width: ${mq_lg}px) and (max-width: ${mq_lg - 0.02})`).matches;
    isBreakpointOnlyXL.value = window.matchMedia(`(min-width: ${mq_xl}px) and (max-width: ${mq_xl - 0.02})`).matches;
}

//

export let isBreakpointUpSM = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointUpMD = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointUpLG = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointUpXL = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

//

export let isBreakpointDownSM = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointDownMD = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointDownLG = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointDownXL = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

//

export let isBreakpointOnlySM = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointOnlyMD = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointOnlyLG = {
    internalVal: false,
    
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointOnlyXL = {
    internalVal: false,
    internalListener: function(_val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal != val) {
            this.internalVal = val;
            this.internalListener(val);
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};
