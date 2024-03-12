import { reactive, ref } from "vue"
import { getPage } from '@/hooks';
const userUser = () => {
  const searchForm = reactive({
    keyWord: '',
  });

  const options = reactive([
    {
      value: 1,
      name: '有效',
    },
  ]);

  // 分页参数
  const page = reactive(getPage());

  const tableData = ref();
  const getTableData = (init) => {
    if (init) {
      page.index = 1;
    }
    let params = {
      page: page.index,
      pageSize: page.size,
    };
    setTimeout(() => {
      tableData.value = [
        {
          date: '呃呃呃',
          name: '呃呃呃呃',
          address: '热热热',
        },
      ];
      page.total = 1;
    }, 100);
  };

  return {
    searchForm,
    tableData,
    options,
    page,
    getTableData
  }
}

export default userUser