const modelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_: any, obj: any) => {
      obj = Object.assign({ id: obj._id }, obj);
      delete obj._id;
      return obj;
    }
  },
  toObject: {
    virtuals: true,
    transform: (_: any, obj: any) => {
      obj = Object.assign({ id: obj._id }, obj);
      delete obj._id;
      return obj;
    }
  },
  versionKey: false,
};

export default modelOptions;