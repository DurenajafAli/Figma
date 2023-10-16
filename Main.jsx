import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Main() {
    const [Inp, setInp] = useState('');
    const [Data, setData] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [clearButton,setClearButton]=useState(false)
    const [remainsCount,setRemainsCount]=useState(0)

    const handleChange = (e) => {
        setInp(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && Inp.trim() !== '' && Inp!=='') {
            setData([...Data, { text: Inp }])
            toast.success('successfully submitted')
            setInp('');
            setRemainsCount(remainsCount +1)
            console.log(Inp, "test");
        }
        else {
            toast.error("please Enter Something")
        }
    };

    const handleCheck = (index) => {
        const updatedData = [...Data];
        updatedData[index].completed = !updatedData[index].completed;
        setData(updatedData);
        setClearButton(true)
        console.log(updatedData);
    };

    const handleDel = (index) => {
        let arr = [...Data]
        arr.splice(index, 1)
        setData(arr);
        setRemainsCount(remainsCount -1)
    }
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        console.log(filter, 'test my filter');
    };

    let filteredData;

    if (activeFilter === 'all') {
        filteredData = Data;
    } else if (activeFilter === 'active') {
        filteredData = Data.filter((item) => !item.completed);
    } else {
        filteredData = Data.filter((item) => item.completed);
        toast.success("successfully Completed")
    }

    const handleClear = (index) => {
        setData([])
        setRemainsCount(0)
    }


    return (
        <>
            <ToastContainer/>
            <div className='flex items-center flex-col pt-20'>
                <h1 className='text-8xl text-[#F3E0E0]'>todos</h1>
                <input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className='w-[40%] text-2xl h-16 px-[60px] mt-10 bg-[#FCFCFC] italic'
                    type='text'
                    placeholder='What needs to be done ?'
                    value={Inp}
                />
            </div>
            <div className='flex justify-evenly items-center flex-col'>
                {filteredData.map((item, index) => (
                    <ul
                        className={`w-[40%] h-16 border bg-[#FCFCFC] text-2xl flex items-center px-[20px] ${item.completed ? 'opacity-50' : ''}`}
                        key={index}
                    >

                        <input
                            type='checkbox'
                            checked={item.completed}
                            onChange={() => handleCheck(index)}
                        />
                        <li className='px-5  relative'>{item.text}
                            <RxCross2 onClick={handleDel} className='absolute  text-[#f95c5c] text-lg mt-[-25px] ml-[390px]' />
                        </li>
                    </ul>
                ))}
                <div className='w-[40%] h-12 border flex items-center px-[20px]'>
                    <h2>Remains {remainsCount}</h2>
                    <div className='px-[80px] flex justify-between items-center gap-5'>
                        <button
                            className={`border p-1 rounded-[5px] ${activeFilter === 'all' ? 'font-bold' : ''
                                }`}
                            onClick={() => handleFilterChange('all')}
                        >
                            All
                        </button>
                        <button
                            className={`border p-1 rounded-[5px] ${activeFilter === 'active' ? 'font-bold' : ''
                                }`}
                            onClick={() => handleFilterChange('active')}
                        >
                            Active
                        </button>
                        <button
                            className={`border p-1 rounded-[5px] ${activeFilter === 'completed' ? 'font-bold' : ''
                                }`}
                            onClick={() => handleFilterChange('completed')}
                        >
                            Completed
                        </button>
                        {clearButton && (

                                <button onClick={handleClear} className='border p-1 rounded-[5px] ml-12'>Clear</button>
                        )}
                            

                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
