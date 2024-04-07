let defaultResume: string | undefined = undefined;
const optimizedResume = `Some text...`;

export const getDefaultResume = async () => {
  return {
    defaultResume: defaultResume,
  };
};

export const saveDefaultResume = async (data: { defaultResume: string }) => {
  defaultResume = data.defaultResume;
  return { success: true, defaultResume: defaultResume };
};

export const getOptimizedResume = (_data: {
  currentResume: string;
  jobDescription: string;
  customInstructions: string;
}) => {
  return {
    optimizedResume: optimizedResume,
  };
};
