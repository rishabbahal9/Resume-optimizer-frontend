let defaultResume = undefined;
const optimizedResume = `Some text...`;

exports.getDefaultResume = async () => {
  return {
    defaultResume: defaultResume,
  };
};

exports.saveDefaultResume = async (data) => {
  defaultResume = data.defaultResume;
  return { success: true, defaultResume: defaultResume };
};

exports.getOptimizedResume = (data) => {
  return {
    optimizedResume: optimizedResume,
  };
};
