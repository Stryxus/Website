export const mq_sm = 576;
export const mq_md = 768;
export const mq_lg = 992;
export const mq_xl = 1200;
export const mq_xxl = 1400;

//

export let isBreakpointUpSM = {
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointUpXXL = {
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointDownXXL = {
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
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
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};

export let isBreakpointOnlyXXL = {
    internalVal: undefined,
    internalListener: function(val: boolean) {},
    set value(val: boolean) {
        if (this.internalVal !== undefined) {
            this.internalVal = val;
            this.internalListener(val);
        } else {
            this.internalVal = val;
        }
    },
    get value(): boolean {
        return this.internalVal;
    },
    registerListener: function(listener: (val: boolean) => void) {
        this.internalListener = listener;
    }
};
