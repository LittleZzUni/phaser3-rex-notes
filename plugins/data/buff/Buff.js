export default {
    addBuff: function (key, buffKey, value) {
        this.enableBuff(key, buffKey);
        var buff = this.buffs[key][buffKey];
        buff.value = value;
        return this;
    },

    enableBuff: function (key, buffKey, enable) {
        if (enable === undefined) {
            enable = true;
        }
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = {};
        }
        if (!this.buffs[key].hasOwnProperty(buffKey)) {
            this.buffs[key][buffKey] = {
                enable: true,
                value: undefined
            }
        }
        var buff = this.buffs[key][buffKey];
        buff.enable = enable;
        return this;
    },

    removeBuff: function (key, buffKey) {
        if (!this.buffs.hasOwnProperty(key)) {
            // Do nothing
        } else if (this.buffs[key].hasOwnProperty(buffKey)) {
            delete this.buffs[key][buffKey];
        }
        return this;
    },

    setBounds: function (key, min, max) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = [undefined, undefined];
        }
        this.bounds[key][0] = min;
        this.bounds[key][1] = max;
        return this;
    },

    getBuffResult: function (key) {
        return this.clamp(key, this.buff(key));
    },

    buff: function (key, baseValue) {
        if (baseValue === undefined) {
            baseValue = this.list[key];
        }
        var result = baseValue;
        if (!this.buffs.hasOwnProperty(key)) {
            return result;
        }

        var buffs = this.buffs[key],
            buffValue, buffValueType;
        for (var buffKey in buffs) {
            buffValue = buffs[buffKey];
            if (!buffValue.enable) {
                continue;
            }

            buffValue = buffValue.value;
            buffValueType = typeof (buffValue);
            if (buffValueType === 'number') {
                result += buffValue;
            } else if (buffValueType === 'string') {
                if (buffValue.indexOf('%') !== -1) {
                    result += baseValue * parseFloat(buffValue) / 100;
                } else {
                    result += parseFloat(buffValue);
                }
            }
        }
        return result;
    },

    clamp: function (key, value) {
        if (value === undefined) {
            value = this.list[key];
        }

        if (!this.bounds.hasOwnProperty(key)) {
            return value;
        }

        var bounds = this.bounds[key];
        var min = bounds[0],
            max = bounds[1];
        if ((min !== undefined) && (value < min)) {
            value = min;
        } else if ((max !== undefined) && (value > max)) {
            value = max;
        }
        return value;
    },

    getBuffs: function (key) {
        return this.buffs[key];
    },

    getBounds: function (key) {
        return this.bounds[key];
    },
};