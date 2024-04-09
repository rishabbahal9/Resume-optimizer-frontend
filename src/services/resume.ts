import axios from "axios";
let defaultResume: string | undefined = undefined;

export const getDefaultResume = async () => {
  return {
    defaultResume: defaultResume,
  };
};

export const saveDefaultResume = async (data: { defaultResume: string }) => {
  defaultResume = data.defaultResume;
  return { success: true, defaultResume: defaultResume };
};

export const getOptimizedResume = async (data: {
  currentResume: string;
  jobDescription: string;
  customInstructions: string;
}) => {
  try {
    const response = await axios({
      method: "post",
      url: `http://127.0.0.1:5000/optimize-resume`,
      data: {
        currentResume: data.currentResume,
        jobDescription: data.jobDescription,
        customInstructions: data.customInstructions,
      },
    });
    return response.data?.answer?.optimizedResume;
  } catch (error: any) {
    console.error(error);
    throw Error(error.message);
  }
};
