import { LocalizedText } from '@/components/ui/LanguageProvider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '隐私政策 | EveryTalk',
  description: 'EveryTalk 隐私政策，说明应用如何处理设备数据和第三方服务请求。',
}

export default function PrivacyPolicyPage() {
  return (
    <article className="legal-page section-padding min-h-screen bg-black pt-32">
      <div className="mx-auto max-w-4xl rounded-3xl border border-dark-border bg-white/[0.04] p-6 shadow-2xl shadow-primary/5 md:p-12">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-accent">
          EveryTalk Legal
        </p>
        <h1 className="mb-4 font-poppins text-4xl font-bold text-white md:text-5xl">
          <LocalizedText>隐私政策</LocalizedText>
        </h1>
        <p className="mb-10 text-gray-400">
          <LocalizedText>生效日期：2026 年 10 月 9 日</LocalizedText>
        </p>

        <div className="space-y-10 leading-8 text-gray-300">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>概述</LocalizedText>
            </h2>
            <p>
              <LocalizedText>
                EveryTalk 是一款由 EveryTalk 项目维护者维护的 Android AI
                客户端。本政策说明你使用聊天、图像、语音、联网搜索、模型上下文协议（MCP）和
                AI 内容举报功能时，EveryTalk 如何处理信息。
              </LocalizedText>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>设备本地保存的信息</LocalizedText>
            </h2>
            <p>
              <LocalizedText>
                EveryTalk 会在应用私有存储中保存聊天记录、模型服务配置、API
                密钥、分组、置顶状态、生成内容引用和其他应用设置。应用不会将这些私有数据加入
                Android 系统云备份或设备间迁移。你主动导出或保存的文件由 Android
                或你选择的存储服务管理。
              </LocalizedText>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>网络服务处理的信息</LocalizedText>
            </h2>
            <p className="mb-4">
              <LocalizedText>
                EveryTalk 本身不提供 AI
                模型。你主动使用联网功能时，应用只向你选择或配置的服务发送完成请求所需的信息：
              </LocalizedText>
            </p>
            <div className="overflow-x-auto rounded-2xl border border-dark-border">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-white/[0.06] text-white">
                  <tr>
                    <th className="p-4">
                      <LocalizedText>功能</LocalizedText>
                    </th>
                    <th className="p-4">
                      <LocalizedText>可能传输的信息</LocalizedText>
                    </th>
                    <th className="p-4">
                      <LocalizedText>接收方与用途</LocalizedText>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  <tr>
                    <td className="p-4">
                      <LocalizedText>AI 聊天</LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        提示词、相关会话上下文、系统指令和附件
                      </LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        你选择的 AI 服务商，用于生成回复
                      </LocalizedText>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <LocalizedText>图像与语音</LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        提示词、图片、录音和语音处理所需文本
                      </LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        你选择的图像、语音或 AI 服务商
                      </LocalizedText>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <LocalizedText>搜索与网页读取</LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>搜索词和你请求读取的网址</LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>已配置的搜索或网页读取服务</LocalizedText>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <LocalizedText>MCP 工具</LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        工具参数、相关上下文和工具结果
                      </LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        你配置的 MCP 服务器，用于执行请求
                      </LocalizedText>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">
                      <LocalizedText>AI 内容举报</LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        举报类别、补充说明、相关回复片段、图片数量、模型和版本信息
                      </LocalizedText>
                    </td>
                    <td className="p-4">
                      <LocalizedText>
                        配置的 EveryTalk 举报接口，用于审核
                      </LocalizedText>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              <LocalizedText>
                这些服务依据各自的条款和隐私政策处理信息。请勿连接你不信任的服务，也不要向其提交敏感信息。
              </LocalizedText>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>权限用途</LocalizedText>
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <LocalizedText>
                  网络：连接 AI、语音、图像、搜索、MCP 和举报服务。
                </LocalizedText>
              </li>
              <li>
                <LocalizedText>
                  麦克风：仅在你启动语音功能后采集音频。
                </LocalizedText>
              </li>
              <li>
                <LocalizedText>
                  相机：仅在你选择相机功能后拍摄图片。
                </LocalizedText>
              </li>
              <li>
                <LocalizedText>蓝牙：支持兼容的已配对音频设备。</LocalizedText>
              </li>
            </ul>
            <p className="mt-4">
              <LocalizedText>
                可选权限会在使用相关功能时请求。拒绝可选权限不会影响无关功能。
              </LocalizedText>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>收集、共享、保存和删除</LocalizedText>
            </h2>
            <p>
              <LocalizedText>
                EveryTalk 不包含广告或分析统计
                SDK，也不出售个人信息。信息只会在你主动使用相关功能时离开设备。设备本地数据会保留到你删除相应内容、清除应用数据或卸载应用；导出的文件保留到你主动删除。第三方服务可能依据自己的政策独立处理信息。
              </LocalizedText>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>账号登录</LocalizedText>
            </h2>
            <p>
              <LocalizedText>
                EveryTalk 通过配置的 Supabase Auth 服务提供可选的 Google
                和邮箱验证码登录。Google
                登录只申请基本身份信息（openid、email、profile），不申请 Gmail
                或 Google Drive 数据。Supabase 会处理账号
                ID、邮箱、关联登录身份以及注册和登录记录。登录不会上传聊天记录或模型
                API 密钥。应用使用 Android Keystore
                保存会话凭据，退出登录会清除本地会话。
              </LocalizedText>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-white">
              <LocalizedText>安全、更新与联系</LocalizedText>
            </h2>
            <p>
              <LocalizedText>
                EveryTalk 的生产连接使用
                HTTPS，并将数据库和配置保存在应用私有存储中。网络安全也取决于你使用的服务商、接口、网络和设备，请妥善保管
                API
                密钥。政策可能随功能或法律要求更新，页面顶部的生效日期表示当前版本。
              </LocalizedText>
            </p>
            <p className="mt-4">
              <LocalizedText>隐私问题或账号删除请求可通过 </LocalizedText>
              <a
                className="text-accent underline"
                href="https://github.com/roseforljh/EveryTalk/issues"
              >
                EveryTalk GitHub Issues
              </a>
              <LocalizedText> 联系维护者。</LocalizedText>
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
