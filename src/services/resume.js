let defaultResume = undefined;
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
    optimizedResume: `Some text...`,
  };
};
