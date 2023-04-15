import { AppContext } from '@/contexts/AppContext';
import { Box, Grid, Input, MenuItem, Select, Stack } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import KeyIcon from '@mui/icons-material/Key';

const Aside: React.FC = () => {
  const { history, setSelectedHistoryIndex, selectedHistoryIndex } = useContext(AppContext);
  const [inputMode, setInputMode] = useState(false);

  const scroll = useCallback((index: number) => {
    document.getElementsByTagName('html')[0].scrollTo(0, 36 + 210 * (index + 1) - 110);
    setSelectedHistoryIndex(index);
  }, []);

  return (
    <Box sx={{
      position: 'fixed',
      top: '0px',
      bottom: '0px',
      background: 'rgb(32 33 35)',
      width: '300px',
      padding: '8px',
    }}>
      <Grid container sx={{
        p: 1.5,
        cursor: 'pointer',
        userSelect: 'none',
        borderRadius: '6px',
        alignItems: 'center',
        '&:hover': {
          background: 'rgb(107, 114, 128, 0.1)'
        },
        }}>
          <span>
            Chat History
          </span>
      </Grid>

      <Box sx={{
        overflow: 'auto',
        maxHeight: '300px',
        overflowY: 'auto'
      }}>
        {
          history.map((item, index) => (
            <Grid
              key={index}
              container
              sx={{
                p: 1.5,
                cursor: 'pointer',
                userSelect: 'none',
                borderRadius: '6px',
                alignItems: 'center',
                overflow: 'hidden',
                flexWrap: 'nowrap',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: 'rgb(107, 114, 128, 0.1)'
                },
                '& > span': {
                  marginLeft: '12px',
                }
              }}
              onClick={() => selectedHistoryIndex === index ? setSelectedHistoryIndex(-1) : scroll(index)}
            >
              <QuestionAnswerIcon sx={{
                width: '16px'
              }} />
              <span>{item[0]}</span>
            </Grid>
          ))
        }
      </Box>

      <Box sx={{
        position: 'absolute',
        width: 'calc(100% - 16px)',
        bottom: '8px',
      }}>
        <Box sx={{
          width: '100%',
          height: '0px',
          margin: '10px 0px',
          borderBottom: '1px solid rgb(82, 82, 82)',
        }} />
        <Grid
          container
          sx={{
            p: 1.5,
            cursor: 'pointer',
            userSelect: 'none',
            borderRadius: '6px',
            alignItems: 'center',
            '&:hover': {
              background: 'rgb(107, 114, 128, 0.1)'
            },
            '& > span': {
              marginLeft: '12px',
            }
          }}
          onClick={() => !inputMode && setInputMode(true)}
        >
          <KeyIcon sx={{
            width: '16px',
          }} />
          {
            inputMode ? <SecretKeyInput onSave={() => setInputMode(false)} /> : <span>OpenAI API Key</span>
          }
        </Grid>
      </Box>
    </Box>
  )
}

const SecretKeyInput: React.FC<{ onSave: () => void }> = ({ onSave }) => {
  const {
    apiKey,
    updateApiKey,
  } = useContext(AppContext);

  return <Stack flexDirection="row" alignItems="center">
    <Input
      value={apiKey}
      type="password"
      onChange={e => updateApiKey(e.target.value)}
      sx={{
        marginRight: '5px',
        marginLeft: '8px',
      }}
    />
    <CheckIcon
      sx={{
        marginRight: '5px',
        width: '16px',
      }}
      onClick={() => {
        onSave();
      }}
    />
    <CloseIcon
      sx={{
      width: '16px'
    }} onClick={onSave} />
  </Stack>;
}

export default Aside;
