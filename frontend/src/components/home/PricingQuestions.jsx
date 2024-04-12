import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import frequentlyAskedQuestions from '../../components-data/frequentlyAskedQuestions.js';

const PricingQuestions = () => {
  return (
    <section className="mb-2">
      <h1 className="text-[#303235] fontChronicle text-[30px] text-center mt-[50px] mb-[35px]">Frequently asked questions</h1>
      <div className="w-[450px] m-auto border-none">
        {frequentlyAskedQuestions.map((question, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" className="text-[#000] text-[15px] fontCera">
                {question.title}
              </AccordionSummary>
              <AccordionDetails className="text-[#696d75] fontCera text-[14px]">{question.answer}</AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
};

export default PricingQuestions;
