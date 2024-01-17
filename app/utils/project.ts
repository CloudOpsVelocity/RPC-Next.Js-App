import { unstable_cache } from "next/cache";
import { Main } from "../validations/types/project";

const getProjectDetails = async (slug: string): Promise<Main> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project/basicDetails?projIdEnc=${slug}`,
    {
      next: { revalidate: 90 },
    }
  );
  const data = await response.json();
  return data as Main; // Assuming the response can be cast to Main
};
const getCachedUser = unstable_cache(
  async (id: string): Promise<Main> => getCachedUser(id),
  ["my-app-user"],
  {
    revalidate: 60,
  }
);
export { getProjectDetails, getCachedUser };

const fakeData = {
  projectName: "GRP Project",
  projIdEnc: "1234\n",
  projectStatus: "projectStatus",
  postedBy: "Builder",
  minPrice: 123,
  maxPrice: 124,
  basePrice: 350,
  totalLandArea: "1000",
  totalUnit: 100,
  startDate: "24 Aug 2020",
  endDate: "24 Aug 2023",
  lat: "12.939258933568892",
  lang: "77.73802867616159",
  address: "office no 15, sigma tech park, whitefield banglore",
  localityName: "whitefield",
  cityName: "Banglore",
  stateName: "Karnataka",
  pinCode: 123456,
  media: {
    coverUrl:
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/cover/cover.jpg",
    projReviewVideoUrl:
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/video/video.mp4",
    projMasterPlanUrl:
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/masterplan/masterplan.jpg",
    projWalkThroughVideoUrl:
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/walk-Through-video/video.mp4",
    projOtherImagesUrl: [
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/other/0.jpg",
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/other/1.jpg",
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/other/2.jpg",
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/other/3.jpg",
      "https://imagesrpc.s3.ap-south-1.amazonaws.com/images/varify/project/197/other/4.jpg",
    ],
  },
  availableProperties: ["Apartment", "villa", "RowHouse"],
  phaseList: [
    {
      phaseId: 2,
      phaseName: "phase 2",
    },
    {
      phaseId: 2,
      phaseName: "phase 2",
    },
  ],
  amenityList: [
    {
      name: "am1",
      id: 1,
    },
    {
      name: "amenity 2",
      id: 3,
    },
    {
      name: "am4",
      id: 4,
    },
    {
      name: "am5",
      id: 5,
    },
    {
      name: "am6",
      id: 6,
    },
    {
      name: "am7",
      id: 7,
    },
    {
      name: "am8",
      id: 8,
    },
    {
      name: "am9",
      id: 9,
    },
  ],
  specificationList: [
    {
      specId: 1,
      specName: "apecification 1",
      values: ["spec1 value1", "spec1 value 2"],
    },
    {
      specId: 2,
      specName: "apecification 2",
      values: ["spec1 value1", "spec2 value 2"],
    },
    {
      specId: 3,
      specName: "specification 3",
      values: ["spec3 value1", "spec3 value 2"],
    },
  ],
  highlights: ["highlights1", "highlights 2", "highlights 3", "highlights 4"],
  wbtp: "Components of a Good Essay\nAn essay is a piece of writing that is written to convince someone of something or to\nsimply inform the reader about a particular topic. In order for the reader to be convinced or\nadequately informed, the essay must include several important components to make it flow in a\nlogical way. The main parts (or sections) to an essay are the intro, body, and conclusion. In a\nstandard short essay, five paragraphs can provide the reader with enough information in a short\namount of space. For a research paper or dissertation, however, it is essential that more than five\nparagraphs are present in order not to overwhelm the reader with too much information in one\nparagraph.\nIntro:\n Must contain an attention grabber for the reader or at least make the essay sound\ninteresting, may begin with a quote about the particular topic\n Ensure that the intro moves from the general to the specific in regards to the topic\n Provides the reader with a “road map” of the essay in a logical order\n At the end there should be what is called a thesis statement, arguably the most important\ncomponent of the intro\n The thesis statement states the aim of the paper and may give insight into the author’s\nexamples and evidence\nBody:\n Includes the evidence and support of the paper in addition to the author’s ideas\n Paragraphs must include a topic sentence which relates the discussion back to the thesis\nstatement\n Logical ordering of ideas: 3 types of order\n1. Chronological order---order of time, good for narratives\n2. Spatial order-good for descriptions of locations; top to bottom, e.g.\n3. Emphatic order-least important to most important; most common for\ncollege writing\n Ensure that transition sentences are present to create a good flow to the essay\n Include substantial examples and evidence to support your argument and remember to\ncite, cite, cite!\n Make sure each example is relevant to your particular topic\nConclusion:\n This section should wrap all of your arguments and points\n Should restate the main arguments in a simplified manner\n Ensure that the reader is left with something to think about, particularly if it is an\nargumentative essay\nAlways remember to allow time to rewrite the first draft of your essay and, then, to proofread\nit before turning it in. For help, visit the Writing Center!",
  faqs: [
    {
      qnaId: null,
      que: "q1",
      ans: "a1",
    },
    {
      qnaId: null,
      que: "q2",
      ans: "a2",
    },
    {
      qnaId: null,
      que: "q3",
      ans: "a3",
    },
  ],
  about:
    "Components of a Good Essay\nAn essay is a piece of writing that is written to convince someone of something or to\nsimply inform the reader about a particular topic. In order for the reader to be convinced or\nadequately informed, the essay must include several important components to make it flow in a\nlogical way. The main parts (or sections) to an essay are the intro, body, and conclusion. In a\nstandard short essay, five paragraphs can provide the reader with enough information in a short\namount of space. For a research paper or dissertation, however, it is essential that more than five\nparagraphs are present in order not to overwhelm the reader with too much information in one\nparagraph.\nIntro:\n Must contain an attention grabber for the reader or at least make the essay sound\ninteresting, may begin with a quote about the particular topic\n Ensure that the intro moves from the general to the specific in regards to the topic\n Provides the reader with a “road map” of the essay in a logical order\n At the end there should be what is called a thesis statement, arguably the most important\ncomponent of the intro\n The thesis statement states the aim of the paper and may give insight into the author’s\nexamples and evidence\nBody:\n Includes the evidence and support of the paper in addition to the author’s ideas\n Paragraphs must include a topic sentence which relates the discussion back to the thesis\nstatement\n Logical ordering of ideas: 3 types of order\n1. Chronological order---order of time, good for narratives\n2. Spatial order-good for descriptions of locations; top to bottom, e.g.\n3. Emphatic order-least important to most important; most common for\ncollege writing\n Ensure that transition sentences are present to create a good flow to the essay\n Include substantial examples and evidence to support your argument and remember to\ncite, cite, cite!\n Make sure each example is relevant to your particular topic\nConclusion:\n This section should wrap all of your arguments and points\n Should restate the main arguments in a simplified manner\n Ensure that the reader is left with something to think about, particularly if it is an\nargumentative essay\nAlways remember to allow time to rewrite the first draft of your essay and, then, to proofread\nit before turning it in. For help, visit the Writing Center!",
  banks: [
    {
      cid: 2,
      constDesc: "bank 2",
    },
    {
      cid: 1,
      constDesc: "bank 1",
    },
    {
      cid: 3,
      constDesc: "bank 3",
    },
    {
      cid: 4,
      constDesc: "bank 4",
    },
    {
      cid: 5,
      constDesc: "bank 5",
    },
    {
      cid: 6,
      constDesc: "bank 6",
    },
  ],
};
