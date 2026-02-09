<template>
  <el-card shadow="always">
    <el-button type="primary" size="default" @click="addStudentButton" :icon=Plus
      style="margin-bottom: 10px;">添加</el-button>

    <el-table :data="StudentList" border style="margin-bottom: 20px;">
      <el-table-column label="序号" width="100" align="center" type="index"> </el-table-column>
      <el-table-column label="姓名" align="center" prop="name"> </el-table-column>
      <el-table-column label="性别" align="center" prop="gender"> </el-table-column>
      <el-table-column label="邮箱" align="center" prop="email"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button type="info" size="small" @click="handleCheck(row)">详情</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
        size="large" :disabled="disabled" :background="true" layout="total, sizes, ->,prev, pager, next, jumper"
        :total="total" @size-change="fetchStudentList" @current-change="fetchStudentList" />
    </div>
  </el-card>
  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="dialogMode === 'add' ? '添加学生' : '编辑学生'" width="500">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rule">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="form.gender">
              <el-radio value="男" size="small" border>男</el-radio>
              <el-radio value="女" size="small" border>女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birthDate">
            <el-date-picker v-model="form.birthDate" type="date" placeholder="请选择出生日期" :disabled-date="disabledDate"
              style="width: 100%" />
          </el-form-item>
        </el-col>
      </el-row>



      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="email" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入电话" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="专业" prop="majorId">
            <el-select v-model="form.majorId" placeholder="请选择专业" style="width: 100%">
              <el-option v-for="item in majorsList" :key="item.id" :label="item.name" :value="item.id || ''" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班级" prop="classId">
            <el-select v-model="form.classId" placeholder="请先选择专业" style="width: 100%" :disabled="!form.majorId">
              <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id || ''" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="年级" prop="grade">
            <el-input v-model="form.grade" placeholder="请输入年级" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学号" prop="studentId">
            <el-input v-model="form.studentId" placeholder="请输入学号" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { getStudentList, addStudent, updateStudent, type StudentListItem, type AddStudentRequest } from "@/api/reqStudentManagement";
import { getMajorsList, type MajorsListItem } from "@/api/reqProfessionalManagement";
import { getClassList, type ClassListItem } from "@/api/reqClassManagement";
import { ElMessage, type FormRules } from "element-plus";
import { Plus } from "@element-plus/icons-vue";


const currentPage = ref(1);
const pageSize = ref(10);
const disabled = ref(false);
const total = ref(0);
const StudentList = ref<StudentListItem[]>([]);
const dialogFormVisible = ref<boolean>(false);
const dialogMode = ref<'add' | 'edit'>('add'); // 对话框模式
const currentEditId = ref<string>(''); // 当前编辑的学生ID
const formRef = ref();

// 专业列表和班级列表
const majorsList = ref<MajorsListItem[]>([]);
const classList = ref<ClassListItem[]>([]);

// 禁止选择未来日期
const disabledDate = (time: Date): boolean => {
  return time.getTime() > Date.now();
};
// 表单数据
const form = reactive<AddStudentRequest>({
  studentId: '',
  name: '',
  gender: '男',
  birthDate: '',
  phone: '',
  email: '',
  idcard: '',
  address: '',
  emergencyContact: '',
  emergencyPhone: '',
  classId: '',
  majorId: '',
  grade: '',
  enrollmentDate: ''
})
// 表单验证规则
const rule: FormRules<AddStudentRequest> = {
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
  ],
  gender: [
    { required: true, message: "请选择性别", trigger: "change" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email" as const, message: "请输入正确的邮箱地址", trigger: ["blur", "change"] },
  ],
  phone: [
    { required: true, message: "请输入电话", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号", trigger: "blur" },
  ],
  classId: [
    { required: true, message: "请输入班级", trigger: "blur" },
  ],
  majorId: [
    { required: true, message: "请输入专业", trigger: "blur" },
  ],
  grade: [
    { required: true, message: "请输入年级", trigger: "blur" },
    { min: 4, max: 4, message: "应为4位数字如2023", trigger: "blur" },
  ],
  studentId: [
    { required: true, message: "请输入学号", trigger: "blur" },
    { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" },
  ],
  birthDate: [
    { required: true, message: "请选择出生日期", trigger: "change" },
  ],
}
// 获取学生列表
const fetchStudentList = async () => {
  try {
    const res = await getStudentList({
      page: currentPage.value,
      limit: pageSize.value,
    });
    if (res.success && res.data) {
      StudentList.value = res.data;
      total.value = res.pagination.total;
    } else {
      ElMessage.error(res.message || '获取学生列表失败');
    }
  } catch (e) {
    ElMessage.error((e as Error).message || '请求失败');
  }
};

// 获取专业列表
const fetchMajorsList = async () => {
  try {
    const res = await getMajorsList({
      page: 1,
      limit: 100, // 获取所有专业
    });
    if (res.success && res.data) {
      majorsList.value = res.data;
    } else {
      ElMessage.error(res.message || '获取专业列表失败');
    }
  } catch (e) {
    ElMessage.error((e as Error).message || '获取专业列表失败');
  }
};

// 获取班级列表（根据专业ID）
const fetchClassList = async (majorId: string) => {
  try {
    const res = await getClassList({
      page: 1,
      limit: 100, // 获取所有班级
      majorId
    });
    if(res.success && res.data){
      classList.value = res.data
    }else {
      ElMessage.error(res.message || '获取班级列表失败');
    }
  } catch (e: any) {
    let errorMsg = '获取班级列表失败';
    if (e.response?.data?.message) {
      errorMsg = e.response.data.message;
    } else if (e.errorMessage) {
      errorMsg = e.errorMessage;
    }
    ElMessage.error(errorMsg);
  }
};

// 监听专业变化，自动获取对应班级
watch(() => form.majorId, (newValue) => {
  form.classId = ''
  if (newValue) {
    fetchClassList(newValue)
  }else {
    classList.value = []
  }
})
  ;

onMounted(() => {
  fetchStudentList();
  fetchMajorsList();
});

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    studentId: '',
    name: '',
    gender: '男',
    birthDate: '',
    phone: '',
    email: '',
    idcard: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    classId: '',
    majorId: '',
    grade: '',
    enrollmentDate: ''
  });
  formRef.value?.clearValidate();
};

// 打开添加对话框
const addStudentButton = () => {
  dialogMode.value = 'add';
  resetForm();
  dialogFormVisible.value = true;
};

// 编辑
const handleEdit = async (row: StudentListItem) => {
  dialogMode.value = 'edit';
  currentEditId.value = row.id || '';
  
  // 先回填除了 classId 之外的数据
  Object.assign(form, {
    studentId: row.studentId,
    name: row.name,
    gender: row.gender,
    birthDate: row.birthDate,
    phone: row.phone,
    email: row.email,
    idcard: row.idcard || '',
    address: row.address || '',
    emergencyContact: row.emergencyContact || '',
    emergencyPhone: row.emergencyPhone || '',
    classId: '', // 先清空，等班级列表加载完再设置
    majorId: row.majorId,
    grade: row.grade,
    enrollmentDate: row.enrollmentDate || ''
  });
  
  // 先加载对应专业的班级列表，然后再设置 classId
  if (row.majorId) {
    await fetchClassList(row.majorId);
    form.classId = row.classId; // 班级列表加载完后再设置
  }
  
  dialogFormVisible.value = true;
};

// 详情
const handleCheck = (row: StudentListItem) => {
  console.log('查看详情', row);
};

// 删除
const handleDelete = (row: StudentListItem) => {
  console.log('删除', row);
};

// 取消
const handleCancel = () => {
  dialogFormVisible.value = false;
  resetForm();
};

// 统一提交处理
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  try {
    const valid = await formRef.value.validate();
    if (!valid) return;
    
    let res;
    if (dialogMode.value === 'add') {
      res = await addStudent(form);
    } else {
      res = await updateStudent(currentEditId.value, form);
    }
    
    if (res.success) {
      ElMessage.success(dialogMode.value === 'add' ? '添加学生成功' : '更新学生成功');
      dialogFormVisible.value = false;
      resetForm();
      await fetchStudentList();
    } else {
      ElMessage.error(res.message || `${dialogMode.value === 'add' ? '添加' : '更新'}学生失败`);
    }
  } catch (e: any) {
    // 获取后端返回的详细错误信息
    let errorMsg = `${dialogMode.value === 'add' ? '添加' : '更新'}学生失败`;
    
    // 优先获取 data 数组中的详细错误信息
    if (e.response?.data?.data && Array.isArray(e.response.data.data) && e.response.data.data.length > 0) {
      errorMsg = e.response.data.data[0].msg || e.response.data.data[0].message;
    } 
    // 其次获取 message 字段
    else if (e.response?.data?.message) {
      errorMsg = e.response.data.message;
    }
    // 最后使用拦截器附加的 errorMessage
    else if (e.errorMessage) {
      errorMsg = e.errorMessage;
    }
    
    ElMessage.error(errorMsg);
  }
};

</script>

<style scoped></style>
<!-- 
  <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio value="男" size="small" border>男</el-radio>
          <el-radio value="女" size="small" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="请输入电话" />
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="form.classId" placeholder="请输入班级" />
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.majorId" placeholder="请输入专业" />
      </el-form-item>
    </el-form>
      <el-form-item label="年级">
        <el-input v-model="form.grade" placeholder="请输入年级" />
      </el-form-item> -->